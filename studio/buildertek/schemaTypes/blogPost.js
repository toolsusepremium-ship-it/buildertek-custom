import {defineField, defineType} from 'sanity'

const CATEGORIES = [
  'Construction Technology',
  'Platform Overview',
  'Financial Management',
  'Procurement',
  'Industry Insights',
]

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: CATEGORIES.map((c) => ({title: c, value: c})),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      placeholder: 'e.g. 6 min read',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'paragraph',
          title: 'Paragraph',
          fields: [
            {name: 'type', type: 'string', hidden: true, initialValue: 'paragraph'},
            {name: 'text', type: 'text', title: 'Text', rows: 4},
          ],
          preview: {select: {title: 'text'}, prepare: ({title}) => ({title: '¶ ' + title})},
        },
        {
          type: 'object',
          name: 'heading3',
          title: 'Heading (H3)',
          fields: [
            {name: 'type', type: 'string', hidden: true, initialValue: 'h3'},
            {name: 'text', type: 'string', title: 'Heading'},
          ],
          preview: {select: {title: 'text'}, prepare: ({title}) => ({title: 'H3 — ' + title})},
        },
        {
          type: 'object',
          name: 'heading4',
          title: 'Heading (H4)',
          fields: [
            {name: 'type', type: 'string', hidden: true, initialValue: 'h4'},
            {name: 'text', type: 'string', title: 'Heading'},
          ],
          preview: {select: {title: 'text'}, prepare: ({title}) => ({title: 'H4 — ' + title})},
        },
        {
          type: 'object',
          name: 'bulletList',
          title: 'Bullet List',
          fields: [
            {name: 'type', type: 'string', hidden: true, initialValue: 'list'},
            {
              name: 'items',
              type: 'array',
              title: 'Items',
              of: [{type: 'string'}],
            },
          ],
          preview: {
            select: {items: 'items'},
            prepare: ({items}) => ({title: '• List (' + (items?.length ?? 0) + ' items)'}),
          },
        },
        {
          type: 'object',
          name: 'quote',
          title: 'Quote',
          fields: [
            {name: 'type', type: 'string', hidden: true, initialValue: 'quote'},
            {name: 'text', type: 'text', title: 'Quote Text', rows: 3},
          ],
          preview: {select: {title: 'text'}, prepare: ({title}) => ({title: '" ' + title})},
        },
      ],
    }),
  ],

  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
