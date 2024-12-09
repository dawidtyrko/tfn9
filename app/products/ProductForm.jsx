'use client';
import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

const productSchema = Yup.object().shape({
    name: Yup.string().min(3, "Minimum 3 characters").required("Name is required"),
    category: Yup.string().required("Category is required"),
    amount: Yup.number().positive("Amount must be positive").required("Amount is required"),
    unitPrice: Yup.number().positive("Price must be positive").required("Unit price is required"),
    supplier: Yup.string().min(3, "Minimum 3 characters").required("Supplier is required"),
});

const ProductForm = ({product, mode, onSubmit}) => {
    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            dateAdded: "2024-11-15"
        }
        try {
            if (mode && product) {
                await fetch(`http://localhost:3000/api/products/${product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                await fetch(`http://localhost:3000/api/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

            }
            console.log(values);
            if (onSubmit) onSubmit(); // Notify parent of successful submission
        } catch (error) {
            console.error("Error in form submission:", error);
            if (error.response) {
                console.log("Validation errors:", error.response.errors);
            }
        }
    };

    const initialValues = product || {
        name: "",
        category: "",
        amount: 0,
        unitPrice: 0,
        supplier: "",
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                    </div>
                    <div>
                        <label htmlFor="category">Category:</label>
                        <Field name="category" as="select">
                            <option value="">Select a category</option>
                            <option value="test">test</option>
                            <option value="test1">test1</option>
                            <option value="test2">test2</option>
                        </Field>
                        <ErrorMessage name="category" component="div" style={{ color: "red" }} />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount:</label>
                        <Field name="amount" type="number" />
                        <ErrorMessage name="amount" component="div" style={{ color: "red" }} />
                    </div>
                    <div>
                        <label htmlFor="unitPrice">Unit Price:</label>
                        <Field name="unitPrice" type="number" step="0.01" />
                        <ErrorMessage name="unitPrice" component="div" style={{ color: "red" }} />
                    </div>
                    <div>
                        <label htmlFor="supplier">Supplier:</label>
                        <Field name="supplier" type="text" />
                        <ErrorMessage name="supplier" component="div" style={{ color: "red" }} />
                    </div>
                    <button type="submit" style={{ marginTop: "10px", width: "100px" }}>
                        {mode ? "Update" : "Add"} Product
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ProductForm;
