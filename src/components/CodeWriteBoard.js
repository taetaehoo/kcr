import React, { useState, useEffect } from 'react';
import styles from '../styles/CodeWriteBoard.module.css';
import Editor, { useMonaco } from '@monaco-editor/react'

function CodeWriteBoard({handleCodeChange}) {
  const monaco = useMonaco();
  
  const [language, setLanguage] = useState('javascript')

  const handleEditorChange = (newCode) => {
    handleCodeChange(newCode);
  };


  return (
    <div className={styles.container}>
      <Editor
      width='1000px'
      height='600px'
      language={language}
      onChange={handleEditorChange}
      options={{
        fontsize: 15,
        minimap: {enabled: true},
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto'
        }
      }} />
    </div>
  );
}

export default CodeWriteBoard;
