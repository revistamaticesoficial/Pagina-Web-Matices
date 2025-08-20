import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Article } from '@/types';
import { formatDate, getCategoryColor, getImagePlaceholder, truncateText } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  if (isFeatured) {
    return (
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <Image
            src={'/images/logo.jpg'}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          {article.isPremium && (
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-yellow-500 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <Badge 
              className={`${getCategoryColor(article.category)} text-white border-0`}
            >
              {article.category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
            <Link href={`/articulos/${article.slug}`}>
              {article.title}
            </Link>
          </h3>
          <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{article.author || 'Redacción Matices'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min de lectura</span>
              </div>
            </div>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isCompact) {
    return (
      <Card className="group hover:shadow-md transition-all duration-300">
        <div className="flex space-x-4 p-4">
          <div className="relative flex-shrink-0">
            <Image
              src={'/images/logo.jpg'}
              alt={article.title}
              width={120}
              height={80}
              className="w-30 h-20 object-cover rounded-md"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            {article.isPremium && (
              <div className="absolute -top-1 -right-1">
                <Crown className="h-4 w-4 text-yellow-500" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Badge 
                className={`${getCategoryColor(article.category)} text-white border-0 text-xs`}
              >
                {article.category}
              </Badge>
              {article.isPremium && (
                <Badge variant="secondary" className="text-xs">
                  Premium
                </Badge>
              )}
            </div>
            
            <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              <Link href={`/articulos/${article.slug}`}>
                {article.title}
              </Link>
            </h3>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatDate(article.publishedAt)}</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{article.readTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <Image
          src={'/images/logo.jpg'}
          alt={article.title}
          width={600}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        {article.isPremium && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge 
            className={`${getCategoryColor(article.category)} text-white border-0`}
          >
            {article.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link href={`/articulos/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
          {truncateText(article.excerpt, 120)}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{article.readTime} min</span>
          </div>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

