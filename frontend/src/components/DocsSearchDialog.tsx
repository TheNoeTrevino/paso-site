import { useEffect, useState, useCallback } from 'react'
import { FileText } from 'lucide-react'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from './ui/command'
import { searchDocs, docsSearchIndex, type DocSearchItem } from '../lib/docs-search'

interface DocsSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (docId: string) => void
}

export function DocsSearchDialog({ open, onOpenChange, onSelect }: DocsSearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<DocSearchItem[]>([])

  useEffect(() => {
    if (query.trim()) {
      setResults(searchDocs(query))
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setResults([])
    }
  }, [open])

  const handleSelect = useCallback(
    (docId: string) => {
      onSelect(docId)
      onOpenChange(false)
    },
    [onSelect, onOpenChange]
  )

  const groupedResults = results.reduce<Record<string, DocSearchItem[]>>((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = []
    }
    acc[item.section].push(item)
    return acc
  }, {})

  const showAllDocs = !query.trim()
  const groupedAllDocs = docsSearchIndex.reduce<Record<string, DocSearchItem[]>>((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = []
    }
    acc[item.section].push(item)
    return acc
  }, {})

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Documentation"
      description="Search through all documentation pages"
      shouldFilter={false}
    >
      <CommandInput
        placeholder="Search docs..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {showAllDocs
          ? Object.entries(groupedAllDocs).map(([section, items]) => (
              <CommandGroup key={section} heading={section}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelect(item.id)}
                  >
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          : Object.entries(groupedResults).map(([section, items]) => (
              <CommandGroup key={section} heading={section}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelect(item.id)}
                  >
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
      </CommandList>
    </CommandDialog>
  )
}

export function useDocsSearch() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return { open, setOpen }
}
