import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Copy, Check } from 'lucide-react';

interface AIHelperProps {
  content: string;
}

export default function AIHelper({ content }: AIHelperProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple summarization logic (in a real app, this would call an AI API)
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const keyPoints = sentences
      .filter((sentence, index) => {
        // Select sentences that contain important keywords or are at key positions
        const importantWords = ['important', 'key', 'fundamental', 'essential', 'remember', 'note'];
        const hasImportantWord = importantWords.some(word => 
          sentence.toLowerCase().includes(word)
        );
        const isFirstOrLast = index === 0 || index === sentences.length - 1;
        const isHeaderLine = sentence.includes('#') || sentence.includes('**');
        
        return hasImportantWord || isFirstOrLast || isHeaderLine || index % 3 === 0;
      })
      .slice(0, 5) // Limit to 5 key points
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 10);

    const generatedSummary = `## Key Points Summary:\n\n${keyPoints.map((point, index) => 
      `${index + 1}. ${point.replace(/#+\s*/, '').replace(/\*\*/g, '')}`
    ).join('\n\n')}\n\n## Quick Review:\nThis content covers the fundamental concepts that are essential for understanding the topic. Focus on practicing the examples and remember the key definitions mentioned above.`;
    
    setSummary(generatedSummary);
    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Study Helper
        </CardTitle>
        <CardDescription>
          Get an AI-generated summary of the reading material to help you study better
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!summary && (
          <Button 
            onClick={generateSummary} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generating Summary...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI Summary
              </>
            )}
          </Button>
        )}
        
        {summary && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">AI Generated Summary</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
              <Textarea
                value={summary}
                readOnly
                className="min-h-[200px] bg-transparent border-none resize-none focus:ring-0"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setSummary('')}
                size="sm"
              >
                Generate New Summary
              </Button>
              <Button 
                onClick={generateSummary} 
                disabled={isLoading}
                size="sm"
              >
                Regenerate
              </Button>
            </div>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground bg-yellow-50 p-3 rounded-lg">
          <strong>Study Tip:</strong> Use this summary for quick review before quizzes. 
          The AI highlights the most important concepts from your reading material.
        </div>
      </CardContent>
    </Card>
  );
}