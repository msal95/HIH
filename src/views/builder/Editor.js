import React, { useEffect, useRef } from 'react';
import { FormEditor } from '@bpmn-io/form-js';
import schema from './schema.json';

import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";

import  './builder.css'
import { formJsonEditor } from '../../../api/apiMethods';
export default function Editor() {
    const formEditorRef = useRef(null);
    useEffect(() => {
      const container = document.querySelector('#form-editor');
      if (container && !formEditorRef.current) {
        const formEditor = new FormEditor({
          container,
        });
        formEditor.importSchema(schema);
        formEditorRef.current = formEditor;
      }
      return () => {
        if (formEditorRef.current) {
          formEditorRef.current.destroy();
          formEditorRef.current = null;
        }
      };
    }, []);
    const handleGetFormJson = async () => {
        try {
          const formJson = formEditorRef.current.saveSchema();
          console.log('formJson:', JSON.stringify(formJson));
            const formJsonData = JSON.stringify(formJson);
          const data = {
            data: formJsonData,
            name: "name builder",
          };
          const response = await formJsonEditor(data);
          console.log('Response:', response);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <div className='' id="form-editor"></div>
            <div>
                <button onClick={handleGetFormJson}>Get Form JSON</button>
            </div>
        </>
    );
  }
