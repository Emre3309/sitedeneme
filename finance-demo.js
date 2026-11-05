'use strict';
(() => {
  const section = document.getElementById('finans-demo');
  if (!section) return;
  const form = document.getElementById('finance-form');
  const description = document.getElementById('finance-description');
  const amount = document.getElementById('finance-amount');
  const category = document.getElementById('finance-category');
  const error = document.getElementById('finance-error');
  const status = document.getElementById('finance-status');
  const list = document.getElementById('finance-transactions');
  const palette = { work:'#4169e1', education:'#4169e1', food:'#839cff', transport:'#b5c4ff', software:'#6576b6', other:'#939bab' };
  const categories = {
    work:{tr:'Çalışma',en:'Work'}, education:{tr:'Eğitim',en:'Education'}, food:{tr:'Yemek',en:'Food'},
    transport:{tr:'Ulaşım',en:'Transport'}, software:{tr:'Yazılım',en:'Software'}, other:{tr:'Diğer',en:'Other'}
  };
  const samples = [
    {id:'sample-1',type:'income',amount:1250000,category:'work',label:{tr:'Örnek serbest çalışma',en:'Sample freelance work'}},
    {id:'sample-2',type:'expense',amount:175000,category:'education',label:{tr:'Kurs ve eğitim',en:'Courses and education'}},
    {id:'sample-3',type:'expense',amount:65000,category:'food',label:{tr:'Yemek',en:'Food'}},
    {id:'sample-4',type:'expense',amount:40000,category:'transport',label:{tr:'Ulaşım',en:'Transport'}},
    {id:'sample-5',type:'expense',amount:29000,category:'software',label:{tr:'Yazılım araçları',en:'Software tools'}}
  ];
  let entries = samples.map(entry => ({...entry}));
  let nextId = 1;
  let lastStatus = null;
  let lastError = null;
  const language = () => document.documentElement.lang === 'en' ? 'en' : 'tr';
  const text = (tr,en) => language() === 'en' ? en : tr;
  const money = cents => new Intl.NumberFormat(language() === 'en' ? 'en-US' : 'tr-TR', {style:'currency',currency:'TRY',currencyDisplay:'narrowSymbol'}).format(cents / 100);
  const name = entry => entry.label ? entry.label[language()] : entry.description;
  function node(tag, className, value) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = value;
    return element;
  }
  function message(kind, entry) {
    if (kind === 'reset') return text('Örnek veriler geri yüklendi.','Sample entries restored.');
    if (kind === 'added') return text('İşlem eklendi: ','Transaction added: ') + name(entry) + ' · ' + money(entry.amount);
    if (kind === 'deleted') return text('İşlem silindi: ','Transaction deleted: ') + name(entry);
    return '';
  }
  function errorText(key) {
    const values = {
      description:['Açıklama 2–60 karakter olmalı.','The description must be 2–60 characters.'],
      amount:['0’dan büyük ve en fazla 1.000.000 TRY tutar gir. En fazla iki ondalık basamak kullan.','Enter an amount greater than 0 and up to 1,000,000 TRY, with no more than two decimal places.'],
      limit:['Demo en fazla 50 işlem tutar. Yeni işlem için birini sil veya örnek veriye dön.','The demo supports up to 50 transactions. Delete one or restore the sample data first.'],
      category:['Geçerli bir kategori ve işlem türü seç.','Select a valid category and transaction type.']
    };
    return values[key] ? text(...values[key]) : '';
  }
  function clearError() { lastError = null; error.hidden = true; error.textContent = ''; form.querySelectorAll('[aria-invalid]').forEach(input=>input.removeAttribute('aria-invalid')); }
  function fail(key, input) {
    lastError = key; error.textContent = errorText(key); error.hidden = false;
    if (input) { input.setAttribute('aria-invalid','true'); input.focus(); }
  }
  function parseCents(raw) {
    const value = raw.trim();
    if (!/^\d{1,7}([.,]\d{1,2})?$/.test(value)) return null;
    const [whole, decimals = ''] = value.replace(',','.').split('.');
    const result = Number(whole) * 100 + Number(decimals.padEnd(2,'0'));
    return Number.isSafeInteger(result) && result > 0 && result <= 100000000 ? result : null;
  }
  function render() {
    section.querySelectorAll('[data-f-tr]').forEach(element=>{element.textContent=element.dataset[language()==='en'?'fEn':'fTr'];});
    section.querySelectorAll('[data-f-placeholder-tr]').forEach(element=>{element.placeholder=element.dataset[language()==='en'?'fPlaceholderEn':'fPlaceholderTr'];});
    section.querySelectorAll('[data-f-label-tr]').forEach(element=>{element.setAttribute('aria-label',element.dataset[language()==='en'?'fLabelEn':'fLabelTr']);});
    let income=0,expense=0;
    const totals = {};
    entries.forEach(entry=>{if(entry.type==='income')income+=entry.amount;else{expense+=entry.amount;totals[entry.category]=(totals[entry.category]||0)+entry.amount;}});
    document.getElementById('finance-income').textContent=money(income);
    document.getElementById('finance-expense').textContent=money(expense);
    const balance=document.getElementById('finance-balance');balance.textContent=money(income-expense);balance.classList.toggle('is-negative',income<expense);
    document.getElementById('finance-chart-total').textContent=money(expense);
    const segments=document.getElementById('finance-segments');segments.replaceChildren();
    const legend=document.getElementById('finance-legend');legend.replaceChildren();
    let offset=0;
    const breakdown=[];
    Object.keys(categories).forEach(key=>{
      if(!totals[key])return;
      const share=totals[key]/expense*100;
      const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
      const attrs={cx:100,cy:100,r:78,fill:'none',stroke:palette[key],'stroke-width':22,pathLength:100,'stroke-dasharray':`${share} ${100-share}`,'stroke-dashoffset':-offset};
      Object.entries(attrs).forEach(([key,value])=>circle.setAttribute(key,String(value)));
      segments.append(circle);offset+=share;
      const item=node('li');const label=node('span','finance-legend-label');const dot=node('span','finance-color-dot');dot.style.backgroundColor=palette[key];dot.setAttribute('aria-hidden','true');label.append(dot,node('span','',categories[key][language()]));item.append(label,node('strong','',money(totals[key])));legend.append(item);
      breakdown.push(categories[key][language()]+': '+money(totals[key]));
    });
    const chartEmpty=document.getElementById('finance-chart-empty');chartEmpty.hidden=expense>0;chartEmpty.textContent=text('Grafiği görmek için bir gider ekle.','Add an expense to see the chart.');
    document.getElementById('finance-chart').setAttribute('aria-label',expense>0 ? text('Gider dağılımı: ','Spending breakdown: ')+breakdown.join('; ') : text('Henüz gider yok.','No expenses yet.'));
    document.getElementById('finance-count').textContent=text(`${entries.length} işlem`,`${entries.length} ${entries.length===1?'transaction':'transactions'}`);
    list.replaceChildren();
    entries.forEach(entry=>{
      const item=node('li','finance-transaction');item.dataset.id=entry.id;
      const sign=node('span','finance-transaction-icon '+entry.type,entry.type==='income'?'+':'−');sign.setAttribute('aria-hidden','true');
      const details=node('div','finance-transaction-info');details.append(node('strong','',name(entry)),node('small','',categories[entry.category][language()]));
      const value=node('span','finance-transaction-value '+entry.type,(entry.type==='income'?'+':'−')+money(entry.amount));
      const remove=node('button','finance-delete',text('Sil','Delete'));remove.type='button';remove.dataset.delete=entry.id;remove.setAttribute('aria-label',text('İşlemi sil: ','Delete transaction: ')+name(entry));
      item.append(sign,details,value,remove);list.append(item);
    });
    const ledgerEmpty=document.getElementById('finance-ledger-empty');ledgerEmpty.hidden=entries.length>0;ledgerEmpty.textContent=text('Henüz işlem yok. Yeni işlem ekleyebilir veya örnek veriye dönebilirsin.','No transactions yet. Add one or restore the sample data.');
    if(lastStatus)status.textContent=message(lastStatus.kind,lastStatus.entry);
    if(lastError){error.textContent=errorText(lastError);error.hidden=false;}
    document.dispatchEvent(new Event('portfolio:layout'));
  }
  function submitTransaction() {
    clearError();
    const label=description.value.trim();
    if(label.length<2||label.length>60){fail('description',description);return;}
    const cents=parseCents(amount.value);
    if(cents===null){fail('amount',amount);return;}
    if(entries.length>=50){fail('limit',description);return;}
    const type=form.querySelector('input[name="finance-type"]:checked')?.value;
    if(!categories[category.value]||!['income','expense'].includes(type)){fail('category',category);return;}
    const entry={id:'user-'+nextId++,type,amount:cents,category:category.value,description:label};
    entries.unshift(entry);lastStatus={kind:'added',entry};render();description.value='';amount.value='';description.focus();
  }
  // Some HTML preview frames allow scripts but disallow native form submission.
  // Treat actions as local button operations; never depend on form navigation.
  form.addEventListener('submit',event=>{event.preventDefault();submitTransaction();});
  form.addEventListener('keydown',event=>{
    if(event.key==='Enter' && !event.isComposing && event.target.matches('#finance-description, #finance-amount')){
      event.preventDefault();submitTransaction();
    }
  });
  section.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button||!section.contains(button))return;
    if(button.matches('.finance-submit')){
      event.preventDefault();submitTransaction();return;
    }
    if(button.id==='finance-reset'){
      entries=samples.map(entry=>({...entry}));clearError();form.reset();lastStatus={kind:'reset'};render();return;
    }
    if(button.hasAttribute('data-delete')){
      const index=entries.findIndex(entry=>entry.id===button.dataset.delete);if(index<0)return;
      const [entry]=entries.splice(index,1);lastStatus={kind:'deleted',entry};clearError();render();
      const next=list.querySelectorAll('button[data-delete]')[Math.min(index,entries.length-1)];(next||description).focus({preventScroll:true});
    }
  });
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  render();
})();
