"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateTransactionStatus } from "@/lib/actions/transactions";

interface TransactionActionsProps {
  transaction: {
    id: string;
    status: string;
  };
}

export function TransactionActions({ transaction }: TransactionActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (transaction.status !== "PENDING") {
    return null;
  }

  async function handleAction(status: "APPROVED" | "DECLINED") {
    setIsLoading(true);
    try {
      await updateTransactionStatus({
        transactionId: transaction.id,
        status,
      });
      toast.success(`Transaction ${status.toLowerCase()}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Action failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isLoading}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleAction("APPROVED")}>
          <Check className="mr-2 h-4 w-4 text-success" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("DECLINED")}>
          <X className="mr-2 h-4 w-4 text-error" />
          Decline
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
