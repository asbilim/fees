import React, { useState } from "react";
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

export default function Home() {
  const [operator, setOperator] = useState("");
  const [balance, setBalance] = useState("");
  const [withdrawalType, setWithdrawalType] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [result, setResult] = useState(null);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Calculateur de Frais de Retrait
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Entrez vos informations</CardTitle>
          <CardDescription>
            Calcul des frais de retrait pour Orange et MTN
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select onValueChange={setOperator} required>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez l'opérateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="mtn">MTN</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Solde du compte"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />
            <Select onValueChange={setWithdrawalType} required>
              <SelectTrigger>
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
                placeholder="Montant à retirer"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                required
              />
            )}
            <Button type="submit">Calculer</Button>
          </form>
        </CardContent>
        <CardFooter>
          {result && (
            <Alert>
              <AlertTitle>Résultat de la transaction</AlertTitle>
              <AlertDescription>
                <p>Montant à retirer : {result.amount.toFixed(2)} FCFA</p>
                <p>Frais de retrait : {result.fees.toFixed(2)} FCFA</p>
                <p>Total déduit : {result.totalDeduction.toFixed(2)} FCFA</p>
                <p>Solde restant : {result.remainingBalance.toFixed(2)} FCFA</p>
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
