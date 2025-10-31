'use client'
import { Button } from "./ui/Button";

export default function ButtonDownloadPDFsEdtions({ filename }: { filename: string }) {
    const downloadPDF = (filename: string) => {
        const link = document.createElement('a') as HTMLAnchorElement;
        link.href = `/editions/${filename}`;
        link.target = '_blank';
        link.download = filename;
        document.body.appendChild(link);
        link.click();
    }
    
    return (
        <Button onClick={() => downloadPDF(filename)} variant="outline" className="flex-1 bg-gradient-to-br from-[#005B82] to-[#003C56] text-white hover:text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
        Descargar
      </Button>
    )
}