import axios from 'axios';

interface GeneratedAnimeTitle {
  title: string;
  englishTitle: string;
  japaneseTitle: string;
  description: string;
  genres: string[];
  rating: number;
}

export class AIService {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
  }

  async generateAnimeTitles(count: number = 10): Promise<GeneratedAnimeTitle[]> {
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. Using fallback generation.');
      return this.generateFallbackTitles(count);
    }

    try {
      const prompt = `Generate ${count} unique and creative anime titles with descriptions. 
      For each anime, provide:
      1. Original title (creative and catchy)
      2. English title translation
      3. Japanese title (romanized)
      4. Brief description (2-3 sentences)
      5. 3-5 genres
      6. Rating (0-10)

      Format as JSON array with keys: title, englishTitle, japaneseTitle, description, genres (array), rating (number).`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a creative anime content generator. Generate unique, engaging anime titles and descriptions in valid JSON format.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.9,
          max_tokens: 2000,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return this.generateFallbackTitles(count);
    } catch (error) {
      console.error('Error generating anime titles with AI:', error);
      return this.generateFallbackTitles(count);
    }
  }

  async enhanceDescription(title: string, originalDescription: string): Promise<string> {
    if (!this.apiKey) {
      return originalDescription;
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an anime content writer. Enhance anime descriptions to be more engaging and SEO-friendly.',
            },
            {
              role: 'user',
              content: `Enhance this anime description for "${title}":\n\n${originalDescription}\n\nMake it more engaging, add keywords for SEO, and keep it 3-4 sentences.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error enhancing description:', error);
      return originalDescription;
    }
  }

  private generateFallbackTitles(count: number): GeneratedAnimeTitle[] {
    const prefixes = ['Mystic', 'Eternal', 'Divine', 'Shadow', 'Crimson', 'Azure', 'Stellar', 'Phantom', 'Sacred', 'Ancient'];
    const middles = ['Warriors', 'Chronicles', 'Dreams', 'Legends', 'Heroes', 'Spirits', 'Knights', 'Guardians', 'Seekers', 'Hunters'];
    const suffixes = ['of the Sky', 'Beyond Time', 'Rising', 'Awakening', 'Revolution', 'Destiny', 'Genesis', 'Odyssey', 'Ascension', 'Requiem'];
    
    const genres = ['Action', 'Adventure', 'Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Thriller', 'Comedy', 'Drama', 'Supernatural'];

    const titles: GeneratedAnimeTitle[] = [];

    for (let i = 0; i < count; i++) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const middle = middles[Math.floor(Math.random() * middles.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      
      const title = `${prefix} ${middle} ${suffix}`;
      const selectedGenres = this.shuffleArray(genres).slice(0, 3 + Math.floor(Math.random() * 2));

      titles.push({
        title,
        englishTitle: title,
        japaneseTitle: this.generateJapaneseRomanization(title),
        description: `An epic tale of ${middle.toLowerCase()} who embark on a journey ${suffix.toLowerCase()}. With ${prefix.toLowerCase()} powers and unwavering determination, they face challenges that will test their resolve and change their world forever.`,
        genres: selectedGenres,
        rating: 7 + Math.random() * 3,
      });
    }

    return titles;
  }

  private generateJapaneseRomanization(title: string): string {
    const words = title.split(' ');
    return words.map(w => {
      const romanized = {
        'Mystic': 'Shinpi',
        'Eternal': 'Eien',
        'Divine': 'Shinsei',
        'Shadow': 'Kage',
        'Crimson': 'Kurenai',
        'Azure': 'Ao',
        'Stellar': 'Hoshi',
        'Phantom': 'Maboroshi',
        'Sacred': 'Sei',
        'Ancient': 'Kodai',
        'Warriors': 'Senshi',
        'Chronicles': 'Monogatari',
        'Dreams': 'Yume',
        'Legends': 'Densetsu',
        'Heroes': 'Eiyuu',
        'Spirits': 'Tamashii',
        'Knights': 'Kishi',
        'Guardians': 'Shugosha',
        'Seekers': 'Tankyuusha',
        'Hunters': 'Kariudo',
      };
      return romanized[w as keyof typeof romanized] || w;
    }).join(' no ');
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

export const aiService = new AIService();
