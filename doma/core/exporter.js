export const exportJSON=rows=>JSON.stringify({schema:"analyzer-jazyk.batch/1.0",createdAt:new Date().toISOString(),results:rows},null,2);
export const exportJSONL=rows=>rows.map(x=>JSON.stringify(x)).join("\n");
const cell=v=>{let s=typeof v==="object"?JSON.stringify(v):String(v??"");return/[",;\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
export function exportCSV(rows){let keys=["id","name","language",...new Set(rows.flatMap(r=>Object.keys(r.analysis?.metrics||{})))];return[keys.map(cell).join(";"),...rows.map(r=>keys.map(k=>cell(k==="id"?r.id:k==="name"?r.name:k==="language"?r.analysis?.language:r.analysis?.metrics?.[k])).join(";"))].join("\n");}
export function downloadText(s,name,mime="text/plain;charset=utf-8"){let b=new Blob(["\ufeff",s],{type:mime}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=name;a.click();URL.revokeObjectURL(u);}
