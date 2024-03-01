import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { Products } from "@/models/products";

const initiateConnection = async () => {
    await mongoose.connect(process.env.CONNECTION_STRING).then(() => {
        console.log('Connection Success');
    });
}

export const GET = async () => {
    try {
        await initiateConnection();
        const allProducts = await Products.find();
        return NextResponse.json({ success: true, productsList: allProducts }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Something Went Wrong, Please try again', description: e }, { status: 400 });
    }
};

export const POST = async (req, _content) => {
    const payload = await req.json();
    const { name, price, color, company, category } = payload;
    try {
        await initiateConnection();
        if (name && price && color && company && category) {
            const newProduct = new Products({
                name,
                price,
                color,
                company,
                category
            });
            const result = await newProduct.save();
            return NextResponse.json({ success: true, product: result }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: 'Required field not found' }, { status: 400 });
        }
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Something Went Wrong, Please try again', description: e }, { status: 400 });
    }
};