import React, { useState, useRef } from 'react';
import {
  Save, X, Folder, Hash, Eye, Edit2, Bold, Italic, Link2,
  Image, List, Type, Table, Code
} from 'lucide-react';

// filepath: frontend/src/components/notes/NoteEditor.jsx
const NoteEditor = ({
  initialNote = { title: '', content: '', folder: '', tags: [] },
  onSave,
  onClose
}) => {
  const [note, setNote] = useState(initialNote);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const editorRef = useRef(null);

  const handleSave = () => {
    onSave(note);
  };

  const insertFormat = (format) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = note.content;
    let insertion = '';
    let cursorOffset = 0;

    switch (format) {
      case 'bold':
        insertion = `**${text.slice(start, end) || 'bold text'}**`;
        cursorOffset = 2;
        break;
      case 'italic':
        insertion = `*${text.slice(start, end) || 'italic text'}*`;
        cursorOffset = 1;
        break;
      case 'link':
        insertion = `[${text.slice(start, end) || 'link text'}](url)`;
        cursorOffset = 3;
        break;
      case 'image':
        insertion = `![${text.slice(start, end) || 'alt text'}](image-url)`;
        cursorOffset = 2;
        break;
      case 'list':
        insertion = `\n- ${text.slice(start, end) || 'list item'}`;
        cursorOffset = 3;
        break;
      case 'heading':
        insertion = `\n# ${text.slice(start, end) || 'heading'}`;
        cursorOffset = 2;
        break;
      case 'code':
        insertion = `\`${text.slice(start, end) || 'code'}\``;
        cursorOffset = 1;
        break;
      case 'table':
        insertion = `\n| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |`;
        cursorOffset = 0;
        break;
      default:
        return;
    }

    const newContent = text.slice(0, start) + insertion + text.slice(end);
    setNote({ ...note, content: newContent });

    // Set cursor position after formatting marks
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + insertion.length - cursorOffset;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const renderMarkdown = (text) => {
    return (
      <div className="prose prose-sm max-w-none">
        {text.split('\n').map((line, index) => {
          // Headers
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{line.slice(2)}</h1>;
          }
          if (line.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-bold mt-3 mb-2">{line.slice(3)}</h2>;
          }
          if (line.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-bold mt-2 mb-1">{line.slice(4)}</h3>;
          }

          // Table
          if (line.startsWith('|')) {
            const isHeader = index > 0 && text.split('\n')[index - 1].startsWith('|');
            const cells = line.split('|').filter(cell => cell.trim());

            if (line.includes('---')) return null; // Skip separator line

            return (
              <div key={index} className="flex border-b border-gray-200">
                {cells.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`flex-1 p-2 ${isHeader ? 'font-bold bg-gray-50' : ''}`}
                  >
                    {renderInlineMarkdown(cell.trim())}
                  </div>
                ))}
              </div>
            );
          }

          // Lists
          if (line.startsWith('- ')) {
            return <li key={index} className="ml-4">{renderInlineMarkdown(line.slice(2))}</li>;
          }

          // Regular paragraph with inline markdown
          return line ? (
            <p key={index} className="mb-2">
              {renderInlineMarkdown(line)}
            </p>
          ) : <br key={index} />;
        })}
      </div>
    );
  };

  const renderInlineMarkdown = (text) => {
    let content = text;

    // Code
    content = content.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>');

    // Bold
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    content = content.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-blue-500 hover:underline">$1</a>'
    );

    // Images
    content = content.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img src="$2" alt="$1" class="max-w-full h-auto rounded">'
    );

    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          placeholder="Note title"
          className="text-lg font-medium focus:outline-none flex-1 mr-4"
        />
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            {isPreviewMode ? (
              <>
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </>
            )}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Metadata Bar */}
      <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          <Folder className="h-4 w-4 text-gray-500 mr-1" />
          <select
            value={note.folder}
            onChange={(e) => setNote({ ...note, folder: e.target.value })}
            className="text-sm bg-transparent border-none focus:outline-none text-gray-600"
          >
            <option value="">Select Folder</option>
            <option value="Work">Work</option>
            <option value="Projects">Projects</option>
            <option value="Meetings">Meetings</option>
          </select>
        </div>
        <div className="flex items-center">
          <Hash className="h-4 w-4 text-gray-500 mr-1" />
          <input
            type="text"
            placeholder="Add tags..."
            className="text-sm bg-transparent border-none focus:outline-none text-gray-600"
          />
        </div>
      </div>

      {/* Formatting Toolbar */}
      {!isPreviewMode && (
        <div className="flex items-center gap-1 px-4 py-2 bg-gray-50 border-b border-gray-200">
          <button
            onClick={() => insertFormat('heading')}
            className="p-1.5 hover:bg-gray-200 rounded"
            title="Heading"
          >
            <Type className="h-4 w-4" />
          </button>
          <button
            onClick={() => insertFormat('bold')}
            className="p-1.5 hover:bg-gray-200 rounded"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() => insertFormat('italic')}
            className="p-1.5 hover:bg-gray-200 rounded"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <button
            onClick={() => insertFormat('list')}
            className="p-1.5 hover:bg-gray-200 rounded"
            title="List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => insertFormat('code')}
            className="p-1.5 hover:bg-gray-200 rounded"
            title="Code"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            onClick={() => insertFormat('table')}
            className="p-1.5 hover:bg-gray-200 rounded"
            title="Table"
          >
            <Table className="h-4 w-4" />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <button
            onClick={() => insertFormat('link')}
            className="p-1.5 hover:bg-gray-200 rounded"
            title="Link"
          >
            <Link2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => insertFormat('image')}
            className="p-1.5 hover:bg-gray-200 rounded"
            title="Image"
          >
            <Image className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Editor/Preview Content */}
      <div className="flex-1 flex overflow-hidden">
        {!isPreviewMode && (
          <div className="flex-1 p-4 overflow-y-auto">
            <textarea
              ref={editorRef}
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              placeholder="Start writing your note..."
              className="w-full h-full resize-none focus:outline-none text-gray-700"
            />
          </div>
        )}
        {isPreviewMode && (
          <div className="flex-1 p-4 overflow-y-auto bg-white">
            {renderMarkdown(note.content)}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
