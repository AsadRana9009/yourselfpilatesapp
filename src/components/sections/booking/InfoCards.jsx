"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";

export default function InfoCards() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Location Card */}
        <Card className="bg-gradient-primary">
          <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <MapPin className="text-secondary h-8 w-8" />
            </div>
            <div className="space-y-1">
              <p className="text-secondary text-lg font-medium">Localizado</p>
              <p className="text-secondary text-base">no centro das</p>
              <p className="text-secondary text-lg font-semibold">
                Caldas da Rainha
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Hours Card */}
        <Card className="bg-gradient-primary">
          <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Clock className="text-secondary h-8 w-8" />
            </div>
            <div className="space-y-1">
              <p className="text-secondary text-lg font-medium">
                Disponível de
              </p>
              <p className="text-secondary text-lg font-semibold">
                Segunda a Sábado
              </p>
              <p className="text-secondary text-lg font-semibold">
                das 8h às 20h
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
