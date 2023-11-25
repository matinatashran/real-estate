import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

function validate(
  schema: yup.ObjectSchema<yup.AnyObject>,
  handler: (body: any) => Promise<any>
) {
  return async (req: NextRequest) => {
    const body = await req.json();
    try {
      await schema.validate(body);
    } catch (err) {
      return NextResponse.json({ error: err.errors[0] }, { status: 400 });
    }
    return await handler(body);
  };
}

export default validate;
