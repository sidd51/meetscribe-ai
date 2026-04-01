import { CheckCircle2, AlertCircle, MinusCircle } from 'lucide-react'

const sentimentConfig = {
  positive: {
    icon: CheckCircle2,
    label: 'Positive',
    classes: 'bg-green-50 text-green-700 border-green-100'
  },
  neutral: {
    icon: MinusCircle,
    label: 'Neutral',
    classes: 'bg-gray-50 text-gray-600 border-gray-100'
  },
  negative: {
    icon: AlertCircle,
    label: 'Needs Attention',
    classes: 'bg-red-50 text-red-600 border-red-100'
  }
}

function SummaryCard({ analysis }){
  
}