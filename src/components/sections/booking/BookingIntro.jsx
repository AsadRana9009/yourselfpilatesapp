import React from "react";

export default function BookingIntro() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h2 className="font-heading text-secondary text-3xl font-normal md:text-5xl">
          Agendar o espaço
        </h2>
        <div className="text-foreground space-y-4 text-base leading-relaxed font-light md:text-lg">
          <p>
            Agende as suas aulas de acordo com a sua agenda e dos seus alunos,
            de forma flexível.
          </p>
          <p>
            Fortaleça a relação com os seus alunos e garanta a fidelização de
            futuros alunos.
          </p>
        </div>
      </div>
    </section>
  );
}
