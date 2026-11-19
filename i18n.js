(()=>{
  const KEY='tpower-ui-language';
  const allowed=new Set(UI_LANGUAGES.map(x=>x[0]));
  let language='zh-CN';
  try{const saved=localStorage.getItem(KEY);if(allowed.has(saved))language=saved;}catch{}
  const originalText=new WeakMap(),originalAttrs=new WeakMap();
  const select=document.createElement('select');
  select.id='language-select';select.setAttribute('aria-label','Language / 语言');
  for(const [code,name] of UI_LANGUAGES){const option=document.createElement('option');option.value=code;option.textContent=name;option.lang=code;select.append(option);}
  select.value=language;
  const host=document.querySelector('.header-spacer');host.classList.add('language-control');host.append(select);
  const note=document.createElement('p');note.className='language-note';note.id='language-note';note.setAttribute('role','status');
  document.querySelector('#app').before(note);
  function translate(source){
    const key=source.trim(),dict=UI_DICTIONARIES[language];
    let translated=dict[key];
    if(translated===undefined&&language!=='zh-CN'){
      const count=key.match(/^(\d+) 项活动$/);
      if(count){const labels={'zh-TW':'項活動',en:'events',ms:'aktiviti',vi:'hoạt động',th:'กิจกรรม',id:'acara',hi:'कार्यक्रम'};translated=count[1]+' '+labels[language];}
      const friends=key.match(/^(\d+) 位好友$/);
      if(friends){const labels={'zh-TW':'位好友',en:'friends',ms:'rakan',vi:'bạn bè',th:'คน',id:'teman',hi:'मित्र'};translated=friends[1]+' '+labels[language];}
    }
    if(translated===undefined && language!=='zh-CN' && language!=='zh-TW' && UI_DICTIONARIES.en){
      translated=UI_DICTIONARIES.en[key];
    }
    if(translated===undefined)return source;
    return source.slice(0,source.length-source.trimStart().length)+translated+source.slice(source.trimEnd().length);
  }
  function apply(){
    observer.disconnect();
    document.documentElement.lang=language;
    document.documentElement.dataset.uiLanguage=language;
    note.textContent=UI_NOTES[language];note.hidden=!UI_NOTES[language];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while(node=walker.nextNode()){
      if(!node.parentElement||node.parentElement.closest('script,style,select,#language-note'))continue;
      let record=originalText.get(node);
      if(!record||node.nodeValue!==record.last)record={source:node.nodeValue,last:node.nodeValue};
      const result=translate(record.source);
      if(node.nodeValue!==result)node.nodeValue=result;
      record.last=result;originalText.set(node,record);
    }
    document.querySelectorAll('[aria-label],[placeholder],[title]').forEach(el=>{
      if(el===select||el.closest('select'))return;
      let record=originalAttrs.get(el)||{};
      for(const attr of ['aria-label','placeholder','title']){
        if(!el.hasAttribute(attr))continue;
        const value=el.getAttribute(attr);let entry=record[attr];
        if(!entry||value!==entry.last)entry={source:value,last:value};
        const translated=translate(entry.source);if(value!==translated)el.setAttribute(attr,translated);
        entry.last=translated;record[attr]=entry;
      }
      originalAttrs.set(el,record);
    });
    // Official copy is translated when a dictionary entry exists. Untranslated zh-CN strings stay as written.
    if(language==='zh-CN' || language==='zh-TW'){
      /* source language */
    }
    if(!location.hash.includes('activity='))document.title='TPOWER · '+UI_DICTIONARIES[language]['促销活动'];
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title']});
  }
  const observer=new MutationObserver(apply);
  select.addEventListener('change',()=>{language=allowed.has(select.value)?select.value:'zh-CN';try{localStorage.setItem(KEY,language)}catch{}apply();});
  apply();
})();
