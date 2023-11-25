import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";

// utils
import connectDB from "@/utils/connectDB";
import { rsp } from "@/utils/replaceNumber";

// models
import User from "@/models/User";
import Profile from "@/models/Profile";

// middleware
import validate from "@/middleware/validate";

// validation-schema
import { advertisementSchema } from "@/validation-schema/advertisement";

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

async function post(body: any) {
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
    const { tagTitle, tagDescription, description, author, title, price } =
      body;
    delete body["_id"];
    await Profile.create({
      ...body,
      price: +rsp(price),
      tagTitle: tagTitle || title,
      tagDescription: tagDescription || description,
      author: author || `${user.firstname} ${user.lastname}` || user.email,
      userId: new Types.ObjectId(user._id),
      published: user.role === "ADMIN" ? true : false,
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

async function patch(body: any) {
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

    const profile = await Profile.findOne({ _id: body._id });
    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        { error: "You can not access to this advertisement!" },
        { status: 403 }
      );
    }

    profile.title = body.title;
    profile.description = body.description;
    profile.address = body.address;
    profile.phone = body.phone;
    profile.price = body.price;
    profile.companyName = body.companyName;
    profile.category = body.category;
    profile.adType = body.adType;
    profile.welfareAmenities = body.welfareAmenities;
    profile.rules = body.rules;
    profile.constructionDate = body.constructionDate;
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

export const POST = validate(advertisementSchema, post);
export const PATCH = validate(advertisementSchema, patch);
