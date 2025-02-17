import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OcrService } from '../../../services/ocr.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile: File | null = null;
  extractedText: string = '';
  extractedLines: string[] = [];
  uploadedFiles: File[] = [];
  isUploading: boolean = false;

  constructor(private ocrService: OcrService) {}

  onSubmit(): void {
    if (this.selectedFile) {
      console.log('Form submitted with file:', this.selectedFile.name);
    } else {
      console.error('No file selected');
    }
  }

  // Handle drag over event
  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Prevent default to allow dropping
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files?.length) {
      this.selectedFile = event.dataTransfer.files[0]; // Allow only the first dropped file
    }
  }

  // Handle file selection from input
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      this.handleFileSelection(files);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log('Uploading file:', this.selectedFile);
    if (!this.selectedFile) return;
    this.isUploading = true;
    if (this.selectedFile) {
      this.ocrService.extractText(this.selectedFile).subscribe(
        (response) => {
          this.extractedText = response;
          this.processExtractedText(response.extractedText);
          this.isUploading = false;
        },
        (error) => {
          console.error('OCR Extraction Error:', error);
        }
      );
    }
  }

  processExtractedText(text: string) {
    if (text) {
      this.extractedLines = text.split('\n').filter(line => line.trim() !== '');
    }
  }

  // Handle file selection logic
  handleFileSelection(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 50MB limit.`);
        continue;
      }

      // Add the file to the list
      this.uploadedFiles.push(file);
    }
  }
}
