/** @format */

"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { SocialButton } from "@/components/Global";
import { AnimateOnView } from "@/components/Global/AnimateOnView";
import certificateData from "./Certificate.json";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: certificateData.certificates.map((cert, index) => ({
      "@type": "EducationalOccupationalCredential",
      position: index + 1,
      name: cert.alt,
      description: cert.description,
      educationalLevel: "Professional",
      credentialCategory: "Professional Certification",
      image: `/assets/static/img/Portfolio/${cert.src}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const Certificate: React.FC = React.memo(() => {
  const [index, setIndex] = useState(-1);
  const { certificates } = certificateData;

  const filteredCertificates = useMemo(
    () =>
      certificates.filter((cert) => !cert.src.toLowerCase().includes("toeic")),
    [certificates]
  );

  const slides = useMemo(() => {
    const allCertificates = [
      ...filteredCertificates,
      certificates.find((cert) => cert.src.toLowerCase().includes("toeic")),
    ];

    return allCertificates.map((cert) => ({
      src: `/assets/static/img/Portfolio/${cert?.src}`,
      title: cert?.alt,
      description: cert?.description,
    }));
  }, [certificates, filteredCertificates]);

  const handleImageClick = (index: number) => {
    setIndex(index);
  };

  return (
    <section
      id="certificate"
      aria-label="Professional Certifications"
      className="bg-secondary relative h-auto w-full p-4 sm:px-10 shadow-xl"
    >
      <AnimateOnView direction="up">
        <h2 className="relative text-3xl text-text mb-4">
          Certificates
          <div
            className="border-b-[3px] border-accent w-[80px]"
            role="presentation"
          ></div>
        </h2>
      </AnimateOnView>

      <AnimateOnView direction="up" delay={150}>
        <p className="text-text sm:w-[50%] w-full mb-8">
          Most of the skills I gained were{" "}
          <span className="text-accent">self-taught.</span> However, I also
          acquired some certifications through testing and competitions.
        </p>
      </AnimateOnView>

      <div className="w-full">
        <div
          className="w-full"
          role="list"
          aria-label="Technical certifications grid"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-4 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCertificates.map((cert, index) => (
                <AnimateOnView
                  key={cert.src}
                  direction="up"
                  delay={300 + index * 100}
                >
                  <figure role="listitem" className="break-inside-avoid">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={`/assets/static/img/Portfolio/${cert.src}`}
                        alt={cert.alt}
                        fill
                        className="object-cover shadow-xl cursor-pointer hover:opacity-80 transition-opacity"
                        priority={index < 3}
                        loading={index < 3 ? "eager" : "lazy"}
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                    <figcaption className="sr-only">
                      {cert.description}
                    </figcaption>
                  </figure>
                </AnimateOnView>
              ))}
            </div>
            <div className="lg:col-span-1 grid grid-cols-1 gap-4">
              <AnimateOnView direction="up" delay={600}>
                <figure role="listitem" className="break-inside-avoid h-full">
                  <div className="aspect-[4/5] sm:aspect-auto relative h-full">
                    <Image
                      src="/assets/static/img/Portfolio/toeic.webp"
                      alt="Advanced TOEIC Certification"
                      fill
                      className="object-cover shadow-xl cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() =>
                        handleImageClick(filteredCertificates.length)
                      }
                    />
                  </div>
                  <figcaption className="sr-only">
                    Advanced TOEIC Certification
                  </figcaption>
                </figure>
              </AnimateOnView>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center mt-12 mb-16">
        <SocialButton
          href="https://instagram.com/andikads__"
          iconUrl="assets/static/img/Icons/instagram.svg"
          altText="Visit my Instagram profile"
          label="Follow me on Instagram"
          classNames="w-full md:w-auto !flex-1"
          aria-label="Follow me on Instagram to see more updates about my professional journey"
        />
      </div>

      <Lightbox
        plugins={[Captions, Thumbnails]}
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        captions={{ showToggle: true, descriptionMaxLines: 3 }}
      />
      <StructuredData />
    </section>
  );
});

Certificate.displayName = "Certificate";
