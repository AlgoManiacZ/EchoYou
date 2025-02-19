"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, CopyIcon, CheckIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(10, "About section must be at least 10 characters"),
  skills: z.string().min(2, "Please enter your skills"),
  experience: z.string(),
  projects: z.string(),
  social: z.string(),
});

export default function ReadmeForm() {
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
      skills: "",
      experience: "",
      projects: "",
      social: "",
    },
  });

  function generateMarkdown(data: z.infer<typeof formSchema>) {
    const md = `# Hi there! 👋 I'm ${data.name}

${data.about}

## 🚀 Skills
${data.skills}

${data.experience ? `## 💼 Experience\n${data.experience}\n` : ""}

${data.projects ? `## 🛠️ Projects\n${data.projects}\n` : ""}

${data.social ? `## 🔗 Connect with me\n${data.social}` : ""}
`;
    return md;
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const md = generateMarkdown(data);
    setMarkdown(md);
  }

  function downloadMarkdown() {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Tabs defaultValue="form" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="form" className="text-lg">Form</TabsTrigger>
        <TabsTrigger value="preview" className="text-lg">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <Card className="p-6 border-purple-500/20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Doe" 
                        {...field}
                        className="border-purple-500/20 focus-visible:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I'm a passionate developer..."
                        className="border-purple-500/20 focus-visible:ring-purple-500 min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="- JavaScript
- React
- Node.js"
                        className="border-purple-500/20 focus-visible:ring-purple-500 min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="### Company Name
Position | Duration
- Accomplishment 1
- Accomplishment 2"
                        className="border-purple-500/20 focus-visible:ring-purple-500 min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Projects</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="### Project Name
Description of the project
- Tech stack used
- Key features"
                        className="border-purple-500/20 focus-visible:ring-purple-500 min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Links</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="- [LinkedIn](your-linkedin-url)
- [Twitter](your-twitter-url)
- [Portfolio](your-portfolio-url)"
                        className="border-purple-500/20 focus-visible:ring-purple-500 min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Generate README
              </Button>
            </form>
          </Form>
        </Card>
      </TabsContent>
      <TabsContent value="preview">
        <Card className="p-6 border-purple-500/20">
          <div className="prose prose-invert max-w-none">
            <pre className="p-4 bg-muted rounded-lg overflow-x-auto border border-purple-500/20">
              {markdown || "Your README preview will appear here..."}
            </pre>
            {markdown && (
              <div className="flex gap-4 mt-4">
                <Button
                  onClick={downloadMarkdown}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" /> Download README.md
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="flex-1 border-purple-500 text-purple-500 hover:bg-purple-500/10"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="mr-2 h-4 w-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon className="mr-2 h-4 w-4" /> Copy to Clipboard
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}