import React, { useEffect, useRef } from 'react';
import { Form } from '@bpmn-io/form-js';
import schema from './schema.json';

import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import  './builder.css'
import { formValueSave } from '../../../api/apiMethods';

export default function ViewFormRender() {
    const formRender = useRef(null);

    const handleGetFormJson = async (data, errors) => {

        const formValue = JSON.stringify(data);
        console.log(formValue, 'formValue', 'errors', errors);
        try {
          const data = {
            data: formValue,
            name: "name builder",
          };
          const response = await formValueSave(data);
          console.log('Response:', response);
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
      const container = document.querySelector('#form');

      if (container && !formRender.current) {
        const formEditor = new Form({
          container,
        });

        formEditor.importSchema(schema);

        formRender.current = formEditor;
      }

      formRender.current.on('submit', ({ data, errors }) => {
        // console.log(data, errors);
        handleGetFormJson(data, errors)
      });

      return () => {
        if (formRender.current) {
          formRender.current.destroy();
          formRender.current = null;
        }
      };
    }, []);

  return (
        <div id="form"></div>
  )
}
