// schemas/product.ts

export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'brand',
            title: 'Brand',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            description: 'A unique URL identifier for the product. Click "Generate" to create one from the name.',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'sizes',
            title: 'Sizes and Prices',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'size', title: 'Size (e.g., 10ml)', type: 'string' },
                    { name: 'price', title: 'Price (MAD)', type: 'number' },
                    { name: 'originalPrice', title: 'Original Price (MAD)', type: 'number', description: 'Optional: Only if the size is on sale.' },
                ]
            }],
        },
        /* {
            name: 'price',
            title: 'Price (MAD)',
            type: 'number',
        }, */
        /* {
            name: 'originalPrice',
            title: 'Original Price (MAD)',
            type: 'number',
        }, */
        {
            name: 'rating',
            title: 'Our Rating (1-5)',
            type: 'number',
            validation: (Rule: any) => Rule.min(1).max(5),
        },
        /* {
            name: 'size',
            title: 'Size (e.g., 10ml)',
            type: 'string',
        }, */
        {
            name: 'description',
            title: 'Description',
            type: 'internationalizedArrayText',
        },
        {
            name: 'topNotes',
            title: 'Top Notes',
            description: 'Enter notes as comma-separated text (e.g., Bergamot, Black Pepper)',
            type: 'internationalizedArrayText',
        },
        {
            name: 'middleNotes',
            title: 'Middle Notes',
            description: 'Enter notes as comma-separated text (e.g., Jasmine, Rose)',
            type: 'internationalizedArrayText',
        },
        {
            name: 'baseNotes',
            title: 'Base Notes',
            description: 'Enter notes as comma-separated text (e.g., Vanilla, Amber)',
            type: 'internationalizedArrayText',
        },
        {
            name: 'gender',
            title: 'Gender',
            type: 'string',
            options: {
                list: [
                    { title: 'Female', value: 'female' },
                    { title: 'Male', value: 'male' },
                ],
                layout: 'radio',
            },
        },
        {
            name: 'season',
            title: 'Season',
            type: 'string',
            options: {
                list: [
                    { title: 'Summer', value: 'summer' },
                    { title: 'Winter', value: 'winter' },
                    { title: 'All Year', value: 'all-year' },
                ],
                layout: 'radio',
            },
        },
        {
            name: 'category',
            title: 'Scent Family',
            type: 'string',
            options: {
                list: [
                    { title: 'Floral', value: 'Floral' },
                    { title: 'Oriental', value: 'Oriental' },
                    { title: 'Woody', value: 'Woody' },
                    { title: 'Fresh', value: 'Fresh' },
                    { title: 'Gourmand', value: 'Gourmand' },
                    { title: 'Aromatic', value: 'Aromatic' },
                ],
            },
        },
        {
            name: 'isNew',
            title: 'New Arrival',
            type: 'boolean',
        },
        {
            name: 'isSale',
            title: 'On Sale',
            type: 'boolean',
        },
        {
            name: 'isFeatured',
            title: 'Is Featured?',
            description: 'Check this to feature the product on the homepage.',
            type: 'boolean',
        },
    ],
}