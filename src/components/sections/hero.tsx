import { Button } from '@/components/ui/button'

interface IHero {
  onClick: () => void
}

function Hero({ onClick }: IHero) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Open Your Excel Files Easily
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
        Import and view your Excel spreadsheets instantly. No complicated setup
        required.
      </p>
      <Button size="lg" className="cursor-pointer" onClick={onClick}>
        Upload Excel
      </Button>
    </section>
  )
}

export default Hero
