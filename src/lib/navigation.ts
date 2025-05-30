/** @format */

import { SectionInfo, NavLink } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
/**
 * Calculate section visibility in viewport for scroll spy functionality
 *
 * @author Andika Dwi Saputra
 * @param section The section to calculate visibility for
 * @returns The visibility score of the section (0-1)
 */
export const calculateSectionVisibility = (section: SectionInfo): number => {
  if (!section.element) return 0;

  const rect = section.element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Simple calculation: how much of the section is in the viewport
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);

  // Visibility score between 0 and 1
  return visibleHeight / rect.height;
};

/**
 * Prepare sections data from nav links for scroll spy
 *
 * @author Andika Dwi Saputra
 * @param navLinks Array of navigation links to prepare for scroll spy
 * @returns Array of section info objects with DOM references
 */
export const prepareSections = (navLinks: NavLink[]): SectionInfo[] => {
  return navLinks
    .filter((link) => link.path.includes("#")) // Include all hash links
    .map((link) => {
      const id = link.path.substring(link.path.indexOf("#") + 1); // Extract ID from path
      return {
        id,
        element: document.getElementById(id),
        path: link.path,
      };
    })
    .filter((section) => section.element !== null);
};

/**
 * Handle smooth scrolling for hash links
 *
 * @author Andika Dwi Saputra
 * @param targetId The ID of the element to scroll to
 * @param fromDifferentPage Should page navigation occur if not on home page
 */
export const scrollToSection = (
  router: AppRouterInstance,
  targetId: string,
  fromDifferentPage: boolean = false
): void => {
  // If we're not on the home page and this is triggered from a link click, navigate to home page
  if (
    fromDifferentPage &&
    typeof window !== "undefined" &&
    window.location.pathname !== "/"
  ) {
    router.push(`/#${targetId}`);
    return;
  }

  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 100, // Offset for navbar height
      behavior: "smooth",
    });
  }
};

/**
 * Handle scroll spy functionality to update active link based on scroll position
 *
 * @author Andika Dwi Saputra
 * @param navLinks Array of navigation links
 * @param setActiveLink Function to update active link state
 */
export const handleScrollSpy = (
  navLinks: NavLink[],
  setActiveLink: (path: string) => void
): void => {
  // Only run on home page
  if (typeof window === "undefined" || window.location.pathname !== "/") {
    return;
  }

  const sections = prepareSections(navLinks);
  if (sections.length === 0) return;

  // Set home as active only when we're at the very top of the page
  if (window.scrollY < 50) {
    setActiveLink("/#home");
    return;
  }

  // Find which section has the top closest to the top of the viewport
  let bestSection: SectionInfo | null = null;
  let bestScore: number = -1;

  for (const section of sections) {
    if (!section.element) continue;

    const rect = section.element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate how much of the section is in view
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    // Calculate a score based on visibility and position
    const visibilityScore = visibleHeight / rect.height;
    const positionScore = 1 - Math.abs(rect.top) / viewportHeight;
    const totalScore = visibilityScore * 0.7 + positionScore * 0.3;

    // Skip home section when we're scrolled down significantly
    if (section.id === "home" && window.scrollY > 200) continue;

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestSection = section;
    }
  }

  // Update active link if a good section is found
  if (bestSection !== null && bestScore > 0.1) {
    setActiveLink(bestSection.path);
  }
};
