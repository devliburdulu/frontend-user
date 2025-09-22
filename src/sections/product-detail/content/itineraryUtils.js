// Function to check if the content has ul/li tags
export const hasUlLiContent = (htmlContent) => {
  if (!htmlContent) return false;
  return htmlContent.includes('<ul') || htmlContent.includes('<li');
};

// Function to extract and process itinerary content
export const processItineraryContent = (htmlContent) => {
  if (!htmlContent) return { sections: [] };
  const sections = [];
  let currentSection = null;
  // Split content berdasarkan tag p yang mengandung strong (judul hari)
  const parts = htmlContent.split(/(<p><strong>.*?<\/strong>.*?<\/p>)/);
  parts.forEach((part, index) => {
    if (part.match(/<p><strong>.*?<\/strong>.*?<\/p>/)) {
      // Ini adalah judul hari
      const titleMatch = part.match(/<strong>(.*?)<\/strong>/);
      const title = titleMatch ? titleMatch[1] : '';
      currentSection = {
        title: title,
        items: [],
      };
      sections.push(currentSection);
    } else if (part.includes('<ul') && currentSection) {
      // Ini adalah list items
      const liRegex = /<li[^>]*>.*?<p>(.*?)<\/p>.*?<\/li>/gs;
      const matches = [...part.matchAll(liRegex)];
      matches.forEach((match) => {
        const itemText = match[1].replace(/<[^>]*>/g, '').trim();
        if (itemText) {
          currentSection.items.push(itemText);
        }
      });
    }
  });
  return { sections };
};

// Function todecode HTML entity
export const decodeHtml = (html) => {
  const txt =
    typeof document !== 'undefined'
      ? document.createElement('textarea')
      : { innerHTML: '', value: '' };
  txt.innerHTML = html;
  return txt.value;
};
