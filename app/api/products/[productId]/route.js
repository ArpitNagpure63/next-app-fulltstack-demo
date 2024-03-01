import { Products } from "@/models/products";
import mongoose from "mongoose"
import { NextResponse } from "next/server"

const initiateConnection = async () => {
    await mongoose.connect(process.env.CONNECTION_STRING).then(() => {
        console.log('Connection Success');
    });
}

export const GET = async (_req, content) => {
    const { productId } = content.params;
    await initiateConnection();
    try {
        const product = await Products.findOne({ _id: productId });
        return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Something Went Wrong, Please try again', description: e }, { status: 400 });
    }
}

export const PUT = async (req, content) => {
    const { productId } = content.params;
    const payload = await req.json();
    const { name, price, company, color, category } = payload;
    await initiateConnection();
    try {
        if (name && price && company && color && category) {
            const result = await Products.findOneAndUpdate({ _id: productId }, payload);
            return NextResponse.json({ success: true, product: result }, { status: 200 });
        }
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Something Went Wrong, Please try again', description: e }, { status: 400 });
    }
};

export const PATCH = async (req, content) => {
    const { productId } = content.params;
    const payload = await req.json();
    const { name, price, company, color, category } = payload;
    await initiateConnection();
    try {
        if (name || price || company || color || category) {
            const result = await Products.findOneAndUpdate({ _id: productId }, payload);
            return NextResponse.json({ success: true, product: result }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: 'Please check the required field' }, { status: 400 });
        }
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Something Went Wrong, Please try again', description: e }, { status: 400 });
    }
};

export const DELETE = async (_req, content) => {
    const { productId } = content.params;
    await initiateConnection();
    try {
        if (productId) {
            const result = await Products.deleteOne({ _id: productId });
            return NextResponse.json({ success: true, product: result }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: 'Please check the product id again' }, { status: 400 });
        }
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Something Went Wrong, Please try again', description: e }, { status: 400 });
    }
};
