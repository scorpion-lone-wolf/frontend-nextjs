import MealsGrid from "@/components/meals/meals-grid";
import { getAllMeals } from "@/lib/meals";
import Link from "next/link";
import { Suspense } from "react";
import MealsLoadingPage from "./loading-out";
import classes from "./page.module.css";

export async function Meals() {
  const meals = await getAllMeals();
  return <MealsGrid meals={meals} />;
}
export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by out vibrant community.",
};
export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meal created <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose you favorite receipe and cook it yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
