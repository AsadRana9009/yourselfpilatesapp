"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ImageIcon } from "lucide-react";

export default function PackageCard({ package: pkg }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = !!pkg.image && !imgError;

  return (
    <Card className="group relative overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      {pkg.badge && (
        <div className="bg-primary absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white">
          {pkg.badge}
        </div>
      )}

      <div className="relative h-56 overflow-hidden bg-muted">
        {hasImage ? (
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted">
            <ImageIcon className="w-10 h-10 text-muted-foreground/40" />
            <span className="text-xs text-muted-foreground/50">No image</span>
          </div>
        )}
        {hasImage && (
          <div className="absolute inset-0 bg-linear-to-t from-white via-white/90 to-transparent" />
        )}
      </div>

      <CardContent className="relative -mt-20 space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="font-heading text-secondary text-xl font-normal md:text-2xl">
            {pkg.title}
          </h3>
          <p className="text-muted-foreground text-sm font-light">
            {pkg.description}
          </p>
        </div>

        <ul className="space-y-2">
          {pkg.features?.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="text-primary h-4 w-4 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-1 pt-2">
          <div className="text-primary text-2xl font-bold">{pkg.price}</div>
          {pkg.discount && (
            <div className="text-xs font-medium text-green-600">
              {pkg.discount}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <Link href={pkg.link} passHref>
            <Button className="bg-gradient-button w-full">Agendar</Button>
          </Link>
          <Link href="/agendar-espaco" passHref>
            <Button variant="outline" size="sm" className="w-full">
              Saber mais
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
