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

  constructor(private ocrService: OcrService) {}

  onSubmit(): void {
    if (this.selectedFile) {
      console.log('Form submitted with file:', this.selectedFile.name);
    } else {
      console.error('No file selected');
    }
  }
  uploadedFiles: File[] = [];

  // Handle drag over event
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Handle file drop event
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFileSelection(files);
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

  // async onUpload() {
  //   if (!this.selectedFile) return;

  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/ocr/extract', formData);
  //     this.extractedText = response.data.extractedText;
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // }

  onUpload() {
    console.log('Uploading file:', this.selectedFile);
    if (!this.selectedFile) return;

    if (this.selectedFile) {
      this.ocrService.extractText(this.selectedFile).subscribe(
        (response) => {
          this.extractedText = response.text;
        },
        (error) => {
          console.error('OCR Extraction Error:', error);
        }
      );
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
