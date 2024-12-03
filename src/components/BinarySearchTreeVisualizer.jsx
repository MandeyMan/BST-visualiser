import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

const BinarySearchTreeVisualizer = () => {
  const [tree, setTree] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [bulkInsertValues, setBulkInsertValues] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchPath, setSearchPath] = useState([]);
  const [activeSearchNode, setActiveSearchNode] = useState(null);
  const [treePositions, setTreePositions] = useState([]);
  const [message, setMessage] = useState('');
  const [animationKey, setAnimationKey] = useState(0);
  const [searchIndex, setSearchIndex] = useState(0);

  // Calculate tree node positions
  const calculatePositions = useCallback((node, x = 400, y = 50, level = 0) => {
    if (!node) return [];

    const positions = [{
      value: node.value,
      x,
      y,
      isSearchPath: searchPath.includes(node.value),
      isActiveSearch: activeSearchNode === node.value
    }];

    const horizontalSpread = 200 / (level + 1);

    if (node.left) {
      positions.push(...calculatePositions(
        node.left, 
        x - horizontalSpread, 
        y + 100, 
        level + 1
      ));
    }

    if (node.right) {
      positions.push(...calculatePositions(
        node.right, 
        x + horizontalSpread, 
        y + 100, 
        level + 1
      ));
    }

    return positions;
  }, [searchPath, activeSearchNode]);

  // Bulk Insert Nodes
  const bulkInsertNodes = () => {
    const valuesToInsert = bulkInsertValues
      .split(/[\s,]+/)
      .map(val => val.trim())
      .filter(val => val !== '' && !isNaN(Number(val)))
      .map(Number);

    let currentTree = tree ? { ...tree } : null;
    const newNodes = [...nodes];

    const insert = (node, value) => {
      if (!node) {
        const newNode = new BSTNode(value);
        newNodes.push(newNode);
        return newNode;
      }

      if (value < node.value) {
        node.left = insert(node.left, value);
      } else if (value > node.value) {
        node.right = insert(node.right, value);
      }

      return node;
    };

    valuesToInsert.forEach(value => {
      currentTree = insert(currentTree, value);
    });

    setTree(currentTree);
    setNodes(newNodes);
    setBulkInsertValues('');
    setMessage(`Inserted ${valuesToInsert.length} nodes`);
    
    const positions = calculatePositions(currentTree);
    setTreePositions(positions);
    setAnimationKey(prev => prev + 1);
  };

  // Search Function with animation
  const performSearch = () => {
    const valueToSearch = Number(searchValue);
    let current = tree;
    const path = [];

    setSearchIndex(0); 

    const searchStepByStep = () => {
      if (!current) {
        setSearchPath([]);
        setActiveSearchNode(null);
        setMessage(`Value ${valueToSearch} not found`);
        return;
      }

      path.push(current.value);
      setSearchPath(path);
      setActiveSearchNode(current.value);

      if (valueToSearch === current.value) {
        setMessage(`Found value ${valueToSearch}`);
        return;
      }

      current = valueToSearch < current.value ? current.left : current.right;
      
      setTimeout(() => {
        setSearchIndex(prev => prev + 1); 
        searchStepByStep(); 
      }, 1000); 
    };

    searchStepByStep(); 
  };

 
  const resetTree = () => {
    setTree(null);
    setNodes([]);
    setSearchPath([]);
    setTreePositions([]);
    setMessage('Tree has been reset');
    setActiveSearchNode(null);
    setAnimationKey(prev => prev + 1);
    setBulkInsertValues('');
    setSearchValue('');
  };

  
  useEffect(() => {
    if (tree) {
      const positions = calculatePositions(tree);
      setTreePositions(positions);
    }
  }, [tree, calculatePositions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <Card className="w-full max-w-6xl mx-auto shadow-2xl">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg p-3">
          <CardTitle className="text-2xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Binary Search Tree Visualizer
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Insert Multiple Nodes
              </label>
              <Textarea
                value={bulkInsertValues}
                onChange={(e) => setBulkInsertValues(e.target.value)}
                placeholder="Enter values separated by spaces or commas (e.g., 10 5 15 3 7 12 18)"
                className="min-h-[100px]"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={bulkInsertNodes}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Insert Nodes
              </Button>
              <Button
                onClick={resetTree}
                variant="destructive"
              >
                Reset Tree
              </Button>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Search Value
              </label>
              <div className="flex space-x-2">
                <Textarea
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Enter value to search"
                  className="flex-1"
                />
                <Button
                  onClick={performSearch}
                  className="bg-green-500 hover:bg-green-600"
                  disabled={!tree}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

        
          <div className="mt-6 relative" style={{ height: '500px' }}>
            <div className="absolute inset-0 bg-white rounded-lg shadow-inner border border-gray-200 overflow-hidden">
              <svg
                key={animationKey}
                className="w-full h-full"
                viewBox="0 0 800 500"
              >
                {treePositions.length > 1 && treePositions.slice(1).map((pos, index) => {
                  const parentPos = treePositions.find(p =>
                    nodes.find(n => n.value === pos.value)?.parent?.value === p.value
                  );
                  return parentPos ? (
                    <line
                      key={`line-${index}`}
                      x1={parentPos.x}
                      y1={parentPos.y}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={pos.isSearchPath ? '#10B981' : '#3B82F6'}
                      strokeWidth="3"
                      className="animate-draw"
                    />
                  ) : null;
                })}

                {treePositions.map((pos, index) => (
                  <g key={`node-${index}`}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="30"
                      fill={pos.isActiveSearch ? '#F59E0B' :
                        pos.isSearchPath ? '#10B981' : '#3B82F6'}
                      className={`animate-popup ${searchIndex === index ? 'animate-pulse' : ''}`}
                    />
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dy=".3em"
                      fill="white"
                      fontWeight="bold"
                    >
                      {pos.value}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

     
       {
         message && <div
  className={`mt-6 p-4 rounded-md shadow-inner ${
    message.includes('not') ? 'bg-red-500' : 'bg-green-500'
  }`}
>
  <p>{message}</p>
</div>
       }   

          <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-inner">
            <h3 className="text-lg font-semibold">Search Path</h3>
            <p className="mt-2 text-sm text-gray-700">
              {searchPath.length > 0 ? (
                <span>Path: {searchPath.join(' → ')}</span>
              ) : (
                <span className='bg-blue-500 p-2 rounded text-white'>No path to display yet</span>
              )}
            </p>
            <p className="mt-2 text-sm text-gray-700">
              {message}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BinarySearchTreeVisualizer;
