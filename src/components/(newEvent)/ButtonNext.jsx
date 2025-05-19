import { Button } from "@/components/ui/button"; //Vi indhenter scadcn button og bruger den

export default function NextButton({ disabled }) {
  return (
    <div className="mt-auto">
      <Button variant="default" disabled={disabled}>
        {/*Knappen er først klik-bar når dato og lokation er valgt */}
        Næste
      </Button>
    </div>
  );
}
