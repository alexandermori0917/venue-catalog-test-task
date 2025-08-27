import Card from "../ui/Card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="text-center">
      <Card>
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Card>
    </div>
  );
}
