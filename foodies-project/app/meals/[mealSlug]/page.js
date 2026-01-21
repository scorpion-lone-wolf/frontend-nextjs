export default async function MealsDetailsPage({ params }) {
  const { mealSlug } = await params;
  return (
    <main>
      <h1>MealsDetailsPage with params : {mealSlug}</h1>
    </main>
  );
}
