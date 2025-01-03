// src/app/notes/[id]/page.tsx
export default function NotePage({ params }: { params: { id: string } }) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Note Details</h1>
        {/* Note editor will go here */}
      </div>
    )
  }
