import { CheckCircle2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useEmailVerificationModal } from "../hooks/useEmailVerificationModal";

export function EmailVerificationModal({ open, email, onClose }) {
  const {
    step,
    code,
    error,
    isLoading,
    resendSeconds,
    handleCodeChange,
    handleSubmit,
    handleResend,
    handleContinue,
  } = useEmailVerificationModal(open, email, onClose);

  if (!open) return null;

  if (step === 2) {
    return (
      <Dialog open>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <DialogTitle>Email təsdiqləndi!</DialogTitle>
              <DialogDescription>
                Email ünvanınız uğurla təsdiqləndi. 3 saniyə sonra avtomatik
                giriş səhifəsinə yönləndiriləcəksiniz.
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="justify-center">
            <Button onClick={handleContinue}>Davam et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email təsdiqləmə</DialogTitle>
          <DialogDescription>
            Email ünvanınıza 6 rəqəmli təsdiq kodu göndərildi. Zəhmət olmasa
            kodu daxil edib təsdiq edin.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="otp">Təsdiq kodu</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="6 rəqəmli kod"
              value={code}
              onChange={handleCodeChange}
              maxLength={6}
              className="text-center tracking-[0.4em] font-mono text-lg"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendSeconds > 0}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800 disabled:text-emerald-400 underline-offset-2 hover:underline"
            >
              {resendSeconds > 0
                ? `Kodu yenidən göndər (${resendSeconds}s)`
                : "Kodu yenidən göndər"}
            </button>
            <Button type="submit" disabled={code.length !== 6 || isLoading}>
              {isLoading ? "Təsdiqlənir..." : "Təsdiq et"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
