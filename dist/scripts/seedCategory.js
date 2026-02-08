import { prisma } from "../lib/prisma";
const categories = [
    // --- 10 ACADEMIC SUBJECTS ---
    { name: "Mathematics", description: "Algebra, Calculus, and Geometry" },
    { name: "Physics", description: "Classical Mechanics to Quantum Physics" },
    { name: "English Literature", description: "Grammar, Writing, and Analysis" },
    {
        name: "Organic Chemistry",
        description: "Chemical reactions and structures",
    },
    { name: "Biology", description: "Cellular biology and Genetics" },
    { name: "Economics", description: "Micro and Macro economic theories" },
    { name: "History", description: "World history and social studies" },
    { name: "Computer Science", description: "Algorithms and Data Structures" },
    { name: "Psychology", description: "Human behavior and mental processes" },
    { name: "Statistics", description: "Probability and Data Analysis" },
    // --- 5 PROFESSIONAL SKILLS ---
    {
        name: "Web Development",
        description: "Building modern apps with React and Node",
    },
    { name: "Graphic Design", description: "UI/UX and visual communication" },
    { name: "Digital Marketing", description: "SEO, SEM, and Content Strategy" },
    {
        name: "Public Speaking",
        description: "Confidence and Presentation skills",
    },
    { name: "Data Science", description: "Machine Learning and Python" },
];
async function main() {
    console.log("Starting seeding categories...");
    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    }
    console.log("Seeding category finished successfully!");
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seedCategory.js.map