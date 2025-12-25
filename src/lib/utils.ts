import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Detects if the user is on iOS Safari
 */
export function isIOSSafari(): boolean {
  const ua = window.navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const webkit = /WebKit/.test(ua);
  const chrome = /CriOS|FxiOS|OPiOS/.test(ua);
  return iOS && webkit && !chrome;
}

/**
 * Downloads the resume PDF with iOS Safari compatibility
 */
export async function downloadResume(): Promise<void> {
  const resumePath = '/AtharvaW29/Atharva_Wagh_Resume.pdf';
  
  // For iOS Safari, open in new tab instead of downloading
  if (isIOSSafari()) {
    // Open PDF in new tab - iOS Safari will allow users to use share/download
    window.open(resumePath, '_blank');
    return;
  }

  try {
    // For other browsers, use blob download approach
    const response = await fetch(resumePath);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.status} ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    // Verify blob is not empty
    if (blob.size === 0) {
      throw new Error('Downloaded file is empty');
    }
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Atharva_Wagh_Resume.pdf';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error downloading resume:', error);
    // Fallback: open in new tab if download fails
    window.open(resumePath, '_blank');
  }
}
