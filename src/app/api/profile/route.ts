import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";

// utils
import connectDB from "@/utils/connectDB";
import { validation } from "@/utils/validation";

// models
import User from "@/models/User";
import Profile from "@/models/Profile";

export async function GET() {
  try {
    await connectDB();

    const profiles = await Profile.find({ published: true }).select("-userId");

    return NextResponse.json({ data: profiles }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occoured in server!" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Access Denied!" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist!" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      address,
      phone,
      price,
      companyName,
      category,
      adType,
      constructionDate,
      tagTitle,
      tagDescription,
      author,
    } = body;

    const emptyErr = validation(
      [
        title,
        description,
        address,
        phone,
        price,
        companyName,
        category,
        adType,
      ],
      "NOT_EMPTY"
    );

    if (emptyErr || !constructionDate) {
      return NextResponse.json(
        { error: emptyErr || "Invalid data! Please fill each fields." },
        { status: 422 }
      );
    }

    delete body["_id"];
    await Profile.create({
      ...body,
      tagTitle: tagTitle || title,
      tagDescription: tagDescription || description,
      author: author || `${user.firstname} ${user.lastname}` || user.email,
      userId: new Types.ObjectId(user._id),
    });

    return NextResponse.json(
      { message: "New Advertisement created successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An Error accoured in server!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Access Denied!" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist!" },
        { status: 404 }
      );
    }

    const {
      _id,
      title,
      description,
      address,
      phone,
      price,
      companyName,
      category,
      adType,
      welfareAmenities,
      rules,
      constructionDate,
    } = await req.json();

    const emptyErr = validation(
      [
        _id,
        title,
        description,
        address,
        phone,
        price,
        companyName,
        category,
        adType,
      ],
      "NOT_EMPTY"
    );

    if (emptyErr || !constructionDate) {
      return NextResponse.json(
        { error: emptyErr || "Invalid data! Please fill each fields." },
        { status: 422 }
      );
    }

    const profile = await Profile.findOne({ _id });
    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        { error: "You can not access to this advertisement!" },
        { status: 403 }
      );
    }

    profile.title = title;
    profile.description = description;
    profile.address = address;
    profile.phone = phone;
    profile.price = price;
    profile.companyName = companyName;
    profile.category = category;
    profile.adType = adType;
    profile.welfareAmenities = welfareAmenities;
    profile.rules = rules;
    profile.constructionDate = constructionDate;
    profile.save();

    return NextResponse.json(
      { message: "Advertisement edited successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An Error accoured in server!" },
      { status: 500 }
    );
  }
}
