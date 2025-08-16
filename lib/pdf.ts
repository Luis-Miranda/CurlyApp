import { PDFDocument, rgb } from "pdf-lib"

export async function insertSignatureToPDF(
  pdfBytes: Uint8Array,
  signatureImage: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]

  const pngImage = await pdfDoc.embedPng(signatureImage)
  const pngDims = pngImage.scale(0.5)

  // Posición de la firma (ajústala si lo necesitas)
  firstPage.drawImage(pngImage, {
    x: 50,
    y: 80,
    width: pngDims.width,
    height: pngDims.height,
  })

  const modifiedPdfBytes = await pdfDoc.save()
  return modifiedPdfBytes
}