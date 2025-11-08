import axios from 'axios';

const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

interface JikanAnime {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  synopsis?: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  genres?: Array<{ name: string }>;
  score?: number;
  episodes?: number;
  status?: string;
  year?: number;
}

interface AnimeData {
  id: number;
  title: string;
  englishTitle?: string;
  japaneseTitle?: string;
  description: string;
  imageUrl: string;
  genres: string[];
  rating: number;
  episodes?: number;
  status?: string;
  year?: number;
}

export class AnimeService {
  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchTopAnime(limit: number = 25): Promise<AnimeData[]> {
    try {
      const response = await axios.get(`${JIKAN_API_BASE}/top/anime`, {
        params: { limit },
      });

      return response.data.data.map((anime: JikanAnime) => this.transformAnime(anime));
    } catch (error) {
      console.error('Error fetching top anime:', error);
      throw error;
    }
  }

  async fetchSeasonalAnime(year?: number, season?: string): Promise<AnimeData[]> {
    try {
      const currentYear = year || new Date().getFullYear();
      const currentSeason = season || this.getCurrentSeason();

      const response = await axios.get(`${JIKAN_API_BASE}/seasons/${currentYear}/${currentSeason}`);
      
      return response.data.data.map((anime: JikanAnime) => this.transformAnime(anime));
    } catch (error) {
      console.error('Error fetching seasonal anime:', error);
      throw error;
    }
  }

  async searchAnime(query: string, limit: number = 20): Promise<AnimeData[]> {
    try {
      const response = await axios.get(`${JIKAN_API_BASE}/anime`, {
        params: { q: query, limit },
      });

      return response.data.data.map((anime: JikanAnime) => this.transformAnime(anime));
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  }

  async fetchAnimeById(id: number): Promise<AnimeData | null> {
    try {
      const response = await axios.get(`${JIKAN_API_BASE}/anime/${id}`);
      return this.transformAnime(response.data.data);
    } catch (error) {
      console.error(`Error fetching anime ${id}:`, error);
      return null;
    }
  }

  async fetchRandomAnime(): Promise<AnimeData> {
    try {
      const response = await axios.get(`${JIKAN_API_BASE}/random/anime`);
      return this.transformAnime(response.data.data);
    } catch (error) {
      console.error('Error fetching random anime:', error);
      throw error;
    }
  }

  async fetchBulkAnime(count: number = 50): Promise<AnimeData[]> {
    const animeList: AnimeData[] = [];
    const batchSize = 25;
    const batches = Math.ceil(count / batchSize);

    for (let i = 0; i < batches; i++) {
      try {
        const page = i + 1;
        const response = await axios.get(`${JIKAN_API_BASE}/top/anime`, {
          params: { page, limit: batchSize },
        });

        const batch = response.data.data.map((anime: JikanAnime) => this.transformAnime(anime));
        animeList.push(...batch);

        if (animeList.length >= count) break;

        await this.delay(1000);
      } catch (error) {
        console.error(`Error fetching batch ${i + 1}:`, error);
        break;
      }
    }

    return animeList.slice(0, count);
  }

  private transformAnime(jikanAnime: JikanAnime): AnimeData {
    return {
      id: jikanAnime.mal_id,
      title: jikanAnime.title,
      englishTitle: jikanAnime.title_english,
      japaneseTitle: jikanAnime.title_japanese,
      description: jikanAnime.synopsis || 'No description available',
      imageUrl: jikanAnime.images.jpg.large_image_url || jikanAnime.images.jpg.image_url,
      genres: jikanAnime.genres?.map(g => g.name) || [],
      rating: jikanAnime.score || 0,
      episodes: jikanAnime.episodes,
      status: jikanAnime.status,
      year: jikanAnime.year,
    };
  }

  private getCurrentSeason(): string {
    const month = new Date().getMonth() + 1;
    if (month >= 1 && month <= 3) return 'winter';
    if (month >= 4 && month <= 6) return 'spring';
    if (month >= 7 && month <= 9) return 'summer';
    return 'fall';
  }
}

export const animeService = new AnimeService();
