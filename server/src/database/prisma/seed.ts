import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products: Prisma.ProductCreateInput[] = [
  {
    title: 'Train',
    description: 'A railway (railroad) car (carriage) that is generally pulled along a railway line by a locomotive. Shown with a pantograph above the carriage on many platforms which makes it look more like a tram car.',
    image: '/train.svg',
  },
  {
    title: 'Umbrella',
    description: 'An opened, dry umbrella. Generally depicted with purple fabric and a hooked handle. Commonly used for various content concerning rainy weather. Occasionally used as a purple accent color.',
    image: '/umbrella.svg',
  },
  {
    title: 'Pencil',
    description: 'A classic yellow pencil. Depicted as a graphite pencil, like a U.S. #2 or European HB, with a sharpened tip and pink eraser. Positioned at a 45° angle, with its tip at the lower left or right. Commonly used for various content concerning writing, drawing, and schooling.',
    image: 'pencil.svg',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const product of products) {
    const dbProduct = await prisma.product.create({
      data: product,
    })
    console.log(`Created product with id: ${dbProduct.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
