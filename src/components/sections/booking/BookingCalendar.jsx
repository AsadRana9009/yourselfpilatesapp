"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Booking for ${name} on ${selectedDate?.toLocaleDateString()} at ${selectedTime}`,
    );
  };

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl md:text-3xl">
                Reserve o Seu Horário
              </CardTitle>
              <CardDescription className="text-center">
                Escolha a data e hora preferida para a sua sessão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-secondary text-lg font-semibold">
                    Selecione a Data
                  </h3>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={{ before: new Date() }}
                      className="rounded-md border"
                    />
                  </div>
                  {selectedDate && (
                    <p className="text-muted-foreground text-center text-sm">
                      Data selecionada:{" "}
                      {selectedDate.toLocaleDateString("pt-PT", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  <h3 className="text-secondary text-lg font-semibold">
                    Informações da Reserva
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Horário</label>
                      <Select
                        value={selectedTime}
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">08:00 - 09:00</SelectItem>
                          <SelectItem value="09:00">09:00 - 10:00</SelectItem>
                          <SelectItem value="10:00">10:00 - 11:00</SelectItem>
                          <SelectItem value="11:00">11:00 - 12:00</SelectItem>
                          <SelectItem value="14:00">14:00 - 15:00</SelectItem>
                          <SelectItem value="15:00">15:00 - 16:00</SelectItem>
                          <SelectItem value="16:00">16:00 - 17:00</SelectItem>
                          <SelectItem value="17:00">17:00 - 18:00</SelectItem>
                          <SelectItem value="18:00">18:00 - 19:00</SelectItem>
                          <SelectItem value="19:00">19:00 - 20:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Nome Completo
                      </label>
                      <Input
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Telefone</label>
                      <Input
                        type="tel"
                        placeholder="+351 XXX XXX XXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-gradient-button w-full"
                      disabled={!selectedDate || !selectedTime}
                    >
                      Confirmar Reserva
                    </Button>
                  </form>

                  <p className="text-muted-foreground text-center text-xs">
                    Receberá um email de confirmação após a reserva
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
