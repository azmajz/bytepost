"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import "react-quill-new/dist/quill.snow.css";
import "quill-table-better/dist/quill-table-better.css";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export const QuillEditor = ({ quillRef, value, onChange }) => {
  const [modules, setModules] = useState({});

  useEffect(() => {
    let isMounted = true;
    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-quill-new'),
        import('quill-table-better')
      ]).then(([quillModule, tableBetterModule]) => {
        const Quill = quillModule.Quill;
        const QuillTableBetter = tableBetterModule.default || tableBetterModule;
        if (Quill && QuillTableBetter) {
          if (!Quill.imports['modules/table-better']) {
            Quill.register({ "modules/table-better": QuillTableBetter }, true);
          }
        }
        if (isMounted) {
          setModules({
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean'],
                ['link', 'image'],
                ["table-better"],
              ],
            },
            table: false,
            "table-better": {
              language: "en_US",
              toolbarTable: true,
            },
            keyboard: {
              bindings: QuillTableBetter ? QuillTableBetter.keyboardBindings : {},
            },
          });
        }
      });
    }
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="write-editor-section">
      {typeof window !== 'undefined' && modules && Object.keys(modules).length > 0 && (
        <ReactQuill
          id="react-quill"
          ref={quillRef}
          value={value}
          onChange={onChange}
          placeholder="✨ Write your post here..."
          theme={"snow"}
          modules={modules}
        />
      )}
    </div>
  );
};
