import React from "react";

import { useTitre } from "../layout/DefaultLayout";

const NeuralNetworksAI = () => {
  
  const { titre, setTitre } = useTitre();
  setTitre("Réseaux de Neurones");
  return (
      <div className="w-full mx-auto bg-white p-10 shadow rounded">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Réseaux de Neurones Artificiels et Concepts Associés
        </h1>

        {/* Section  Réseaux de Neurones Artificiels */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Réseaux de Neurones Artificiels</h2>

          <h3 className="text-xl font-semibold text-gray-800">Définition</h3>
          <p className="text-gray-700 leading-relaxed">
            Les réseaux neuronaux sont des modèles informatiques développés pour effectuer des tâches d'apprentissage
            et de prédiction en imitant le fonctionnement des neurones biologiques.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">Architecture</h3>
          <p className="text-gray-700 leading-relaxed">
            Un réseau neuronal est constitué de plusieurs couches : une couche d'entrée, des couches cachées et une
            couche de sortie. Chaque neurone est connecté aux neurones des couches suivantes par des poids ajustés
            pendant l'apprentissage pour améliorer les performances.
          </p>

          <div className="w-full flex items-center justify-center"><img src="/img/Architecture.png" alt="Architecture des réseaux de neurones" className="my-4 w-1/2 rounded" /></div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">Fonctionnement des Couches</h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-4">
            <li>
              <strong>Couche d'entrée :</strong> Reçoit les données brutes. Chaque neurone représente une caractéristique ou dimension des données d'entrée.
            </li>
            <li>
              <strong>Couches cachées :</strong> Effectuent des transformations complexes via des combinaisons linéaires des entrées pondérées et des fonctions d'activation.
            </li>
            <li>
              <strong>Couche de sortie :</strong> Produit les résultats finaux, tels que des prédictions ou classifications.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">Fonctionnement des Neurones</h3>
          <p className="text-gray-700 leading-relaxed">
            Un neurone artificiel calcule une somme pondérée des entrées et applique une fonction d'activation pour produire une sortie :
          </p>
          <pre className="bg-gray-100 text-gray-800 p-4 rounded mt-4">
            Z = b + Σ (wi * xi)
            <br />
            Y = f(Z)
          </pre>
          <p className="text-gray-700 mt-4">
            Où <code>Z</code> est la somme pondérée, <code>b</code> est le biais, et <code>f</code> est la fonction d'activation.
          </p>
          <div className="w-full flex items-center justify-center"><img src="/img/Fonctionnement.png" alt="Fonctionnement des neurones" className="my-4 w-1/2 rounded" /></div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mt-6">Fonction d'activation</h3>
          <p className="text-gray-700 leading-relaxed">
          La fonction d'activation est une fonction mathématique appliquée à la
somme pondérée des entrées d'un neurone, appelée également activation
pondérée, à laquelle on ajoute un biais. Cette fonction d'activation introduit de
la non-linéarité dans le modèle et détermine si le neurone doit être activé ou
non en fonction de cette valeur.
</p>
<div className="w-full flex items-center justify-center">
  <img src="/img/activation.png" alt="Architecture des réseaux de neurones" className="my-4 w-1/2 rounded" /></div>

          <p className="text-gray-700 leading-relaxed mt-4">
          Parmi les fonction d’activation les plus utilisés on a :
          </p>
          <p>
          <strong>Fonction ReLU (Rectified Linear Unit) :</strong>est une fonction non-linéaire qui
retourne zéro si l'entrée est négative et l'entrée elle-même si elle est
positive. Elle est fréquemment utilisée dans les réseaux de neurones
profonds en raison de sa simplicité et de son efficacité de calcule
        </p>
        <div className="w-full flex items-center justify-center"><img src="/img/ReLU.png" alt="Architecture des réseaux de neurones" className="my-4 w-1/2 rounded" /></div>
        </section>
        {/* Section  Apprentissage des réseaux de neurones artificiels */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Apprentissage des Réseaux de Neurones Artificiels</h2>
          <p className="text-gray-700 leading-relaxed">
            L'objectif de l'apprentissage est de régler les paramètres (poids <code>W</code> et biais <code>B</code>) pour minimiser les erreurs entre les prédictions et les valeurs réelles.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Cela se fait en définissant une fonction de coût qui mesure l'erreur globale du modèle et en ajustant les paramètres à l'aide d'algorithmes comme la descente de gradient.
          </p>
        </section>

        {/* Section  Fonction de Coût */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Fonction de Coût</h2>
          <p className="text-gray-700 leading-relaxed">
            La fonction de coût évalue la différence entre les prédictions du modèle et les valeurs réelles. Une fonction couramment utilisée est l'erreur quadratique moyenne (MSE) :
          </p>
          <pre className="bg-gray-100 text-gray-800 p-4 rounded mt-4">
            MSE = (1/n) * Σ (yi - yi_pred)²
          </pre>
          <p className="text-gray-700 mt-4">
            Cette fonction pénalise les erreurs importantes, ce qui pousse le modèle à s'améliorer pour réduire l'écart.
          </p>
          </section>

        {/* Section  Principe de Rétropropagation */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Principe de Rétropropagation</h2>
          <p className="text-gray-700 leading-relaxed">
            La rétropropagation est une méthode qui calcule les gradients des paramètres du modèle par rapport à la fonction de coût en utilisant la règle de la chaîne.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Elle permet d'ajuster les poids en minimisant l'erreur grâce à l'algorithme de descente de gradient. La mise à jour des paramètres suit la formule :
          </p>
          <pre className="bg-gray-100 text-gray-800 p-4 rounded mt-4">
            θj = θj - α * (∂J(θ) / ∂θj)
          </pre>
          <p className="text-gray-700 mt-4">
            Où <code>α</code> est le taux d'apprentissage, contrôlant la taille des pas pour minimiser la fonction de coût.
          </p>
          <div className="w-full flex items-center justify-center"><img src="/img/Principe.png" alt="Exemple de rétropropagation" className="my-4 w-1/2 rounded" /></div>
        </section>
      </div>
  );
};

export default NeuralNetworksAI;
