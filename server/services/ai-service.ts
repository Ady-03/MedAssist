import { generateFirstAidGuidance } from "./openai-service";
import { generateFirstAidGuidanceWithDeepSeek } from "./deepseek-service";
import { generateFirstAidGuidanceWithGemini } from "./gemini-service";

// Interface for assessment results
export interface AIAssessmentResult {
  assessment: string;
  steps: string[];
  warnings: string[];
}

/**
 * Unified service that attempts to use preferred AI service first, with multiple fallbacks
 * @param images Array of image file paths
 * @param textDescription Text description of the injury/condition
 * @param audioFilePath Path to the audio file if available
 * @returns First aid assessment results
 */
export async function generateFirstAidGuidanceUnified(
  images: string[] = [],
  textDescription: string = "",
  audioFilePath?: string
): Promise<AIAssessmentResult> {
  // Check if an API preference was set in environment
  const preferredApi = process.env.PREFERRED_AI_API?.toLowerCase();
  
  // Track errors for better diagnostics
  const errors: Error[] = [];
  
  // Attempt services based on preference or availability
  try {
    // Use Gemini if it's preferred or if other keys aren't available
    if (preferredApi === "gemini" || 
        (!process.env.OPENAI_API_KEY && !process.env.DEEPSEEK_API_KEY && process.env.GEMINI_API_KEY)) {
      return await generateFirstAidGuidanceWithGemini(images, textDescription, audioFilePath);
    }
    
    // Try DeepSeek if preferred or if OpenAI key is not available but DeepSeek is
    if (preferredApi === "deepseek" || 
        (!process.env.OPENAI_API_KEY && process.env.DEEPSEEK_API_KEY)) {
      return await generateFirstAidGuidanceWithDeepSeek(images, textDescription, audioFilePath);
    }
    
    // Default: Try OpenAI first
    return await generateFirstAidGuidance(images, textDescription, audioFilePath);
  } catch (error) {
    console.log("Primary AI service failed, attempting fallbacks...");
    if (error instanceof Error) {
      errors.push(error);
    }
    
    // First fallback attempt
    try {
      // Try Gemini as first fallback if available and not already tried
      if (preferredApi !== "gemini" && process.env.GEMINI_API_KEY) {
        return await generateFirstAidGuidanceWithGemini(images, textDescription, audioFilePath);
      }
      
      // Try DeepSeek as first fallback if available and not already tried
      if (preferredApi !== "deepseek" && process.env.DEEPSEEK_API_KEY) {
        return await generateFirstAidGuidanceWithDeepSeek(images, textDescription, audioFilePath);
      }
      
      // Try OpenAI as first fallback if available and not already tried
      if (preferredApi !== "openai" && process.env.OPENAI_API_KEY) {
        return await generateFirstAidGuidance(images, textDescription, audioFilePath);
      }
      
      // If we reached here, we need to try the next fallback
      throw new Error("First fallback failed or no suitable first fallback available");
    } catch (firstFallbackError) {
      if (firstFallbackError instanceof Error) {
        errors.push(firstFallbackError);
      }
      
      // Second fallback attempt
      try {
        // Try the last remaining service option if available
        if (preferredApi !== "openai" && preferredApi !== "gemini" && process.env.OPENAI_API_KEY) {
          return await generateFirstAidGuidance(images, textDescription, audioFilePath);
        }
        
        if (preferredApi !== "deepseek" && preferredApi !== "gemini" && process.env.DEEPSEEK_API_KEY) {
          return await generateFirstAidGuidanceWithDeepSeek(images, textDescription, audioFilePath);
        }
        
        if (preferredApi !== "openai" && preferredApi !== "deepseek" && process.env.GEMINI_API_KEY) {
          return await generateFirstAidGuidanceWithGemini(images, textDescription, audioFilePath);
        }
        
        // If we reached here with no success, we've exhausted all options
        throw new Error("Second fallback failed or no suitable second fallback available");
      } catch (secondFallbackError) {
        if (secondFallbackError instanceof Error) {
          errors.push(secondFallbackError);
        }
        
        console.error("All AI services failed:", errors);
        throw new Error("All AI services are currently unavailable. Please try again later.");
      }
    }
  }
}