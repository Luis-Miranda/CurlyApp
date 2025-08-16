"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SignaturePad } from "@/components/ui/SignaturePad";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PDFDocument } from "pdf-lib";
import { format } from "date-fns";
import Image from "next/image";

export default function ClientePage() {
  const { id } = useParams();
  const [cliente, setCliente] = useState<any>(null);
  const [nuevoDiagnostico, setNuevoDiagnostico] = useState("");
  const [editando, setEditando] = useState(false);
  const [diagnosticoActual, setDiagnosticoActual] = useState("");
  const [firmaVisible, setFirmaVisible] = useState(false);
  const [fotosSeleccionadas, setFotosSeleccionadas] = useState<FileList | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      if (!id) return;
      const docRef = doc(db, "clientes", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const datos = docSnap.data();
        setCliente(datos);
        setDiagnosticoActual(datos.diagnostico || "");
      }
    };
    obtenerCliente();
  }, [id]);

  const guardarDiagnostico = async () => {
    if (!id || !nuevoDiagnostico.trim()) return;
    const docRef = doc(db, "clientes", id as string);
    const diagnosticoHistorial = cliente?.historialDiagnosticos || [];
    await updateDoc(docRef, {
      historialDiagnosticos: [
        ...diagnosticoHistorial,
        { fecha: new Date().toISOString(), texto: nuevoDiagnostico },
      ],
    });
    setNuevoDiagnostico("");
    setCliente((prev: any) => ({
      ...prev,
      historialDiagnosticos: [
        ...(prev.historialDiagnosticos || []),
        { fecha: new Date().toISOString(), texto: nuevoDiagnostico },
      ],
    }));
  };

  const actualizarDiagnosticoActual = async () => {
    if (!id) return;
    const docRef = doc(db, "clientes", id as string);
    await updateDoc(docRef, {
      diagnostico: diagnosticoActual,
    });
    setEditando(false);
    setCliente((prev: any) => ({ ...prev, diagnostico: diagnosticoActual }));
  };

  const handleFirmaGuardada = async (firmaUrl: string) => {
    const existingPdfBytes = await fetch("/terminos_condiciones_ejemplo.pdf").then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pngImage = await pdfDoc.embedPng(firmaUrl);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width } = firstPage.getSize();

    firstPage.drawImage(pngImage, {
      x: width - 250,
      y: 50,
      width: 200,
      height: 100,
    });

    const pdfBytes = await pdfDoc.save();
    const storageRef = ref(storage, `firmas/${id}.pdf`);
    await uploadBytes(storageRef, new Blob([pdfBytes], { type: "application/pdf" }));
    const downloadUrl = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "clientes", id as string), {
      pdfFirmado: downloadUrl,
    });

    setFirmaVisible(false);
    setCliente((prev: any) => ({ ...prev, pdfFirmado: downloadUrl }));
  };

  const handleSubirFotos = async () => {
    if (!fotosSeleccionadas || !id) return;
    const urls: string[] = [];
    for (const foto of Array.from(fotosSeleccionadas)) {
      const nombreUnico = `${id}_${Date.now()}_${foto.name}`;
      const storageRef = ref(storage, `fotos_clientes/${nombreUnico}`);
      const snap = await uploadBytes(storageRef, foto);
      const url = await getDownloadURL(snap.ref);
      urls.push(url);
    }

    const nuevasFotos = [...(cliente.fotos ?? []), ...urls];
    await updateDoc(doc(db, "clientes", id as string), { fotos: nuevasFotos });
    setCliente((prev: any) => ({ ...prev, fotos: nuevasFotos }));
  };

  if (!cliente) return <p>Cargando cliente...</p>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Perfil de Cliente</h1>
      <p>Nombre: {cliente.nombre}</p>
      <p>Teléfono: {cliente.telefono}</p>
      <p>Correo: {cliente.correo}</p>
      <p>
        Cumpleaños:{" "}
        {cliente.cumpleanos ? format(new Date(cliente.cumpleanos), "dd/MM/yyyy") : "-"}
      </p>
      <p>Ciudad: {cliente.ciudad}</p>

      {/* Diagnóstico actual */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Diagnóstico Actual</h2>
        {editando ? (
          <div className="space-y-2">
            <Textarea
              value={diagnosticoActual}
              onChange={(e) => setDiagnosticoActual(e.target.value)}
              className="min-h-[120px]"
            />
            <Button onClick={actualizarDiagnosticoActual}>Guardar</Button>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="whitespace-pre-line">{cliente.diagnostico || "Sin diagnóstico actual"}</p>
            <Button variant="outline" onClick={() => setEditando(true)}>
              Editar
            </Button>
          </div>
        )}
      </div>

      {/* Historial de diagnósticos */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Historial de Diagnósticos</h2>
        <ul className="list-disc pl-5">
          {(cliente.historialDiagnosticos ?? []).map((item: any, idx: number) => (
            <li key={idx}>
              <strong>{format(new Date(item.fecha), "dd/MM/yyyy")}:</strong> {item.texto}
            </li>
          ))}
        </ul>
        <Textarea
          placeholder="Nuevo diagnóstico..."
          value={nuevoDiagnostico}
          onChange={(e) => setNuevoDiagnostico(e.target.value)}
        />
        <Button onClick={guardarDiagnostico}>Agregar Diagnóstico</Button>
      </div>

      {/* Subida de fotos */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Fotos del Cliente</h2>
        <input
          type="file"
          ref={inputFileRef}
          multiple
          accept="image/*"
          onChange={(e) => setFotosSeleccionadas(e.target.files)}
        />
        <Button onClick={handleSubirFotos}>Subir Fotos</Button>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {(cliente.fotos ?? []).map((foto: string, index: number) => (
            <div key={index} className="relative w-full aspect-square">
              <Image
                src={foto}
                alt={`Foto ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Firma de términos */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">PDF firmado</h2>
        {cliente.pdfFirmado ? (
          <div className="flex gap-4 items-center">
            <a
              href={cliente.pdfFirmado}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              Ver archivo firmado
            </a>
            <a
              href={cliente.pdfFirmado}
              download={`Terminos_y_Condiciones_${cliente.nombre || "cliente"}.pdf`}
            >
              <Button variant="outline">Descargar PDF</Button>
            </a>
          </div>
        ) : (
          <>
            <Button onClick={() => setFirmaVisible(true)}>
              Firmar términos y condiciones
            </Button>
            {firmaVisible && (
              <SignaturePad userId={id as string} onSave={handleFirmaGuardada} />
            )}
          </>
        )}
      </div>
    </div>
  );
}