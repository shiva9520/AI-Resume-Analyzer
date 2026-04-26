import io
from PyPDF2 import PdfReader

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts text from a given PDF file in bytes.
    """
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        raise Exception(f"Failed to read PDF: {str(e)}")
