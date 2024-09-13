"use client";
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download } from "lucide-react"; // Optionnel: Icône pour le bouton de téléchargement

export default function Home() {
  const [operator, setOperator] = useState("");
  const [balance, setBalance] = useState("");
  const [withdrawalType, setWithdrawalType] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [result, setResult] = useState(null);

  const resultRef = useRef(null);

  const calculateFees = (amount) => {
    const feeRate = operator === "orange" ? 0.015 : 0.02;
    return amount * feeRate;
  };

  const calculateMaxWithdrawal = () => {
    const minBalance = 1000;
    if (parseFloat(balance) <= minBalance) return 0;
    const feeRate = operator === "orange" ? 0.015 : 0.02;
    return (parseFloat(balance) - minBalance) / (1 + feeRate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount =
      withdrawalType === "specific"
        ? parseFloat(withdrawalAmount)
        : calculateMaxWithdrawal();
    const fees = calculateFees(amount);
    const totalDeduction = amount + fees;
    const remainingBalance = parseFloat(balance) - totalDeduction;

    setResult({
      amount,
      fees,
      totalDeduction,
      remainingBalance,
    });
  };

  const handleDownload = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current, { scale: 2 }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "resultat_transaction.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-orange-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl rounded-lg bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold text-orange-500">
              Calculateur de Frais de Retrait
            </CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Calcul des frais de retrait pour Orange et MTN
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Select onValueChange={setOperator} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisissez l'opérateur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="mtn">MTN</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Solde du compte (FCFA)"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
              <Select onValueChange={setWithdrawalType} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type de retrait" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="specific">Montant spécifique</SelectItem>
                  <SelectItem value="maximum">Maximum possible</SelectItem>
                </SelectContent>
              </Select>
              {withdrawalType === "specific" && (
                <Input
                  type="number"
                  placeholder="Montant à retirer (FCFA)"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              )}
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg">
                Calculer
              </Button>
            </form>
          </CardContent>
          {result && (
            <CardFooter>
              <div
                className="flex flex-col items-center space-y-4"
                ref={resultRef}>
                <Alert className="w-full bg-yellow-100 border-yellow-300 text-yellow-700">
                  <AlertTitle>Résultat de la transaction</AlertTitle>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>
                        <strong>Montant à retirer :</strong>{" "}
                        {result.amount.toFixed(2)} FCFA
                      </p>
                      <p>
                        <strong>Frais de retrait :</strong>{" "}
                        {result.fees.toFixed(2)} FCFA
                      </p>
                      <p>
                        <strong>Total déduit :</strong>{" "}
                        {result.totalDeduction.toFixed(2)} FCFA
                      </p>
                      <p>
                        <strong>Solde restant :</strong>{" "}
                        {result.remainingBalance.toFixed(2)} FCFA
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
                <Button
                  type="button"
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg">
                  <Download className="mr-2 h-5 w-5" />
                  Télécharger en image
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
