import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Bassam Assaf",
  description:
    "Learn more about Bassam Assaf - student, founder, and developer building tools that make learning easier and work more meaningful.",
  keywords: [
    "Bassam Assaf",
    "about",
    "developer",
    "student",
    "founder",
    "AI",
    "education",
    "ExamVault",
  ],
  openGraph: {
    title: "About - Bassam Assaf",
    description:
      "Learn more about Bassam Assaf - student, founder, and developer building tools that make learning easier and work more meaningful.",
    url: "https://bassamassaf.com/about",
    siteName: "Bassam Assaf Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Bassam Assaf",
    description:
      "Learn more about Bassam Assaf - student, founder, and developer building tools that make learning easier and work more meaningful.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
