"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { app } from "@/lib/firebase";

type SignaturePadProps = {
  userId: string;
  onSave: (url: string) => void;
};

export const SignaturePad: React.FC<SignaturePadProps> = ({ userId, onSave }) => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const [isSigned, setIsSigned] = useState(false);
  const { toast } = useToast();
  const storage = getStorage(app);

  const handleClear = () => {
    sigCanvasRef.current?.clear();
    setIsSigned(false);
  };

  const handleSave = async () => {
    if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
      toast({
        title: "Firma vacía",
        description: "Por favor firma antes de guardar.",
        variant: "destructive",
      });
      return;
    }

    try {
      // ⚠️ Aquí usamos getCanvas() en lugar de getTrimmedCanvas() para evitar el error
      const canvas = sigCanvasRef.current.getCanvas();
      const dataUrl = canvas.toDataURL("image/png");

      const filePath = `firmas_clientes/${userId}_${Date.now()}.png`;
      const storageRef = ref(storage, filePath);

      await uploadString(storageRef, dataUrl, "data_url");
      const downloadUrl = await getDownloadURL(storageRef);

      onSave(downloadUrl);

      toast({
        title: "Firma guardada",
        description: "La firma fue subida correctamente.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al subir firma",
        description: "Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md p-2 bg-white">
        <SignatureCanvas
          penColor="black"
          canvasProps={{ className: "w-full h-48 border border-gray-300 rounded" }}
          ref={sigCanvasRef}
          onEnd={() => setIsSigned(true)}
        />
      </div>
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={handleClear}>
          Limpiar
        </Button>
        <Button onClick={handleSave} disabled={!isSigned}>
          Guardar firma
        </Button>
      </div>
    </div>
  );
};