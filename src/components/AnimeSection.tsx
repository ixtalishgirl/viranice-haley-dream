import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Star, 
  Calendar, 
  Heart, 
  Search, 
  Filter,
  ExternalLink,
  Clock,
  Users,
  Award
} from 'lucide-react';

interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number;
  year: number;
  status: string;
  genres: Array<{ name: string }>;
  synopsis: string;
  episodes: number;
  duration: string;
  rating: string;
}

const AnimeSection = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  // Mock anime data for demo (In real app, use Jikan API)
  const mockAnimeData: Anime[] = [
    {
      mal_id: 1,
      title: "Demon Slayer",
      title_english: "Demon Slayer: Kimetsu no Yaiba",
      images: {
        jpg: {
          image_url: "https://via.placeholder.com/300x400/ff69b4/ffffff?text=Demon+Slayer",
          large_image_url: "https://via.placeholder.com/600x800/ff69b4/ffffff?text=Demon+Slayer"
        }
      },
      score: 8.7,
      year: 2019,
      status: "Finished Airing",
      genres: [{ name: "Action" }, { name: "Supernatural" }],
      synopsis: "A young boy becomes a demon slayer to save his sister and avenge his family.",
      episodes: 26,
      duration: "23 min per ep",
      rating: "R - 17+"
    },
    {
      mal_id: 2,
      title: "Your Name",
      title_english: "Kimi no Na wa",
      images: {
        jpg: {
          image_url: "https://via.placeholder.com/300x400/dda0dd/ffffff?text=Your+Name",
          large_image_url: "https://via.placeholder.com/600x800/dda0dd/ffffff?text=Your+Name"
        }
      },
      score: 8.4,
      year: 2016,
      status: "Movie",
      genres: [{ name: "Romance" }, { name: "Drama" }],
      synopsis: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
      episodes: 1,
      duration: "106 min",
      rating: "PG-13"
    },
    {
      mal_id: 3,
      title: "Attack on Titan",
      title_english: "Shingeki no Kyojin",
      images: {
        jpg: {
          image_url: "https://via.placeholder.com/300x400/87ceeb/ffffff?text=Attack+on+Titan",
          large_image_url: "https://via.placeholder.com/600x800/87ceeb/ffffff?text=Attack+on+Titan"
        }
      },
      score: 9.0,
      year: 2013,
      status: "Finished Airing",
      genres: [{ name: "Action" }, { name: "Drama" }],
      synopsis: "Humanity fights for survival against giant humanoid Titans.",
      episodes: 75,
      duration: "24 min per ep",
      rating: "R - 17+"
    },
    {
      mal_id: 4,
      title: "Spirited Away",
      title_english: "Sen to Chihiro no Kamikakushi",
      images: {
        jpg: {
          image_url: "https://via.placeholder.com/300x400/98fb98/ffffff?text=Spirited+Away",
          large_image_url: "https://via.placeholder.com/600x800/98fb98/ffffff?text=Spirited+Away"
        }
      },
      score: 9.3,
      year: 2001,
      status: "Movie",
      genres: [{ name: "Adventure" }, { name: "Family" }],
      synopsis: "A girl enters a world ruled by gods and witches where humans are turned into beasts.",
      episodes: 1,
      duration: "125 min",
      rating: "PG"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAnimeList(mockAnimeData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const genres = ['all', 'Action', 'Romance', 'Drama', 'Adventure', 'Comedy', 'Fantasy'];

  const filteredAnime = animeList.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (anime.title_english && anime.title_english.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGenre = selectedGenre === 'all' || 
                        anime.genres.some(genre => genre.name === selectedGenre);
    
    return matchesSearch && matchesGenre;
  });

  return (
    <section id="anime" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="magic-text">Anime Paradise</span> 🌸
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-poppins">
            Dive into Haley's carefully curated collection of the most beautiful anime. 
            From heartwarming romances to epic adventures - find your next favorite series! 💖
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for your favorite anime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-full border-card-border glass-card focus:ring-sakura-primary font-poppins"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {genres.map((genre) => (
              <Button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`
                  whitespace-nowrap rounded-full px-6 py-3 transition-all duration-300
                  ${selectedGenre === genre 
                    ? 'btn-purple' 
                    : 'glass-card hover:glass-card-hover text-foreground'
                  }
                `}
              >
                {genre === 'all' ? 'All Genres' : genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Anime Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="glass-card rounded-2xl overflow-hidden">
                <div className="aspect-[3/4] bg-muted animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
                  <div className="h-8 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnime.map((anime) => (
              <Card key={anime.mal_id} className="glass-card-hover group cursor-pointer border-0 overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-haley-blue/90 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      {anime.score}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full btn-sakura">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Now
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-sakura-primary transition-colors line-clamp-2 font-poppins">
                    {anime.title_english || anime.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {anime.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {anime.episodes} eps
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {anime.genres.slice(0, 2).map((genre, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs border-sakura-primary/30 text-sakura-primary"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-3 font-poppins">
                    {anime.synopsis}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredAnime.length === 0 && (
          <div className="text-center py-16">
            <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-xl font-bold magic-text mb-2">No anime found</h3>
              <p className="text-muted-foreground font-poppins">
                Try adjusting your search or filter settings!
              </p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold magic-text mb-4">Discover More Anime Magic! ✨</h3>
            <p className="text-muted-foreground mb-6 font-poppins">
              Join Haley's anime community and never miss the latest releases and hidden gems!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-sakura">
                <Heart className="w-5 h-5 mr-2" />
                Create Watchlist
              </Button>
              <Button className="btn-haley">
                <ExternalLink className="w-5 h-5 mr-2" />
                Browse All Anime
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimeSection;